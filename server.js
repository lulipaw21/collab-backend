const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let users = [];

app.post('/register', (req, res) => {
  const { nome, username, email, password } = req.body;
  if (!nome || !username || !email || !password) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }
  const userExists = users.find(u => u.username === username || u.email === email);
  if (userExists) {
    return res.status(400).send('Usuário ou email já existe.');
  }
  users.push({ nome, username, email, password });
  res.send('Registro realizado com sucesso!');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if(!username || !password) {
    return res.status(400).send('Usuário e senha são obrigatórios.');
  }
  const user = users.find(u => (u.username === username || u.email === username) && u.password === password);
  if(!user) {
    return res.status(400).send('Usuário ou senha inválidos.');
  }
  res.send(`Bem-vindo, ${user.nome}!`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
