// server.js atualizado com Firebase
const express = require('express');
const path = require('path');
const admin = require('firebase-admin');
const app = express();

// Configurações Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  })
})

const db = admin.firestore();
const usersCollection = db.collection('usuarios');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rota de cadastro
app.post('/register', async (req, res) => {
  const { nome, username, email, password } = req.body;

  if (!nome || !username || !email || !password) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  try {
    const userExists = await usersCollection.where('username', '==', username).get();
    const emailExists = await usersCollection.where('email', '==', email).get();

    if (!userExists.empty || !emailExists.empty) {
      return res.status(400).send("Usuário ou email já existe.");
    }

    await usersCollection.add({ nome, username, email, password });
    res.send("Registro realizado com sucesso!");

  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).send("Erro ao registrar usuário.");
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Usuário e senha são obrigatórios.");
  }

  try {
    const querySnapshot = await usersCollection
      .where('username', '==', username)
      .get();

    if (querySnapshot.empty) {
      return res.status(400).send("Usuário não encontrado.");
    }

    let userFound = false;
    querySnapshot.forEach(doc => {
      const data = doc.data();
      if (data.password === password) {
        res.send(`Bem-vindo, ${data.nome}!`);
        userFound = true;
      }
    });

    if (!userFound) {
      res.status(400).send("Senha incorreta.");
    }

  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).send("Erro ao fazer login.");
  }});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`); });