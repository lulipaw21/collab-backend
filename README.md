# COLLAB - Sistema de Cadastro e Login

Este projeto é uma aplicação web simples para cadastro e login de usuários, construída com **HTML/CSS** no front-end e **Node.js com Express** no back-end.

---

## Estrutura do Projeto

- **registro-front+back/**  
  - **public/**  
    - `login.html` — Página de login com formulário e opções de login social.  
    - `registro.html` — Página de cadastro de novos usuários.  
    - `logo-collab.png` — Logo usada nas páginas.  
  - `server.js` — Servidor Express para gerenciar as rotas de registro e login.  
  - `package.json` — Configurações do projeto e dependências.

---

## Funcionamento

### Front-end

- **Cadastro (`registro.html`):**  
  Usuário preenche o formulário com nome, usuário, email e senha. Ao enviar, os dados são enviados para o servidor via `fetch` na rota `/register`.  
  Se o cadastro for bem-sucedido, o usuário é redirecionado para a página de login com um parâmetro na URL para exibir um pop-up de confirmação.

- **Login (`login.html`):**  
  Usuário entra com nome de usuário, email ou telefone e senha. Os dados são enviados via `fetch` para a rota `/login`.  
  Se o login for válido, uma mensagem de boas-vindas é exibida. Se o usuário acabou de se cadastrar, aparece um pop-up de confirmação no topo da página.

### Back-end (`server.js`)

- Usa Express para criar as rotas:
  - `POST /register`: valida os dados e adiciona o usuário a uma lista temporária em memória.
  - `POST /login`: valida as credenciais e responde com mensagem de sucesso ou erro.

- Os usuários são armazenados apenas na memória do servidor enquanto ele estiver rodando (sem banco de dados).

---

## Como rodar o projeto

1. Clone este repositório.  
2. No terminal, dentro da pasta `registro-front+back`, rode:  
   ```bash
   npm install
   npm start

   acessar:

   http://localhost:3000/login.html
   http://localhost:3000/registro.html
