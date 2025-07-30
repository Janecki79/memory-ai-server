const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'pamiec-ai-secret',
  resave: false,
  saveUninitialized: true
}));

const USERS_FILE = path.join(__dirname, 'data', 'users.json');

function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return {};
  return JSON.parse(fs.readFileSync(USERS_FILE));
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send({ message: 'Podaj nazwę użytkownika i hasło.' });
  const users = readUsers();
  if (users[username]) return res.status(409).send({ message: 'Użytkownik już istnieje.' });
  const hashedPassword = await bcrypt.hash(password, 10);
  users[username] = { password: hashedPassword, cloud: null, token: null };
  writeUsers(users);
  res.send({ message: 'Rejestracja zakończona pomyślnie.' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users[username];
  if (!user) return res.status(401).send({ message: 'Nieprawidłowa nazwa użytkownika lub hasło.' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).send({ message: 'Nieprawidłowa nazwa użytkownika lub hasło.' });
  req.session.username = username;
  res.send({ message: 'Zalogowano', user: username });
});

app.post('/reset-password', async (req, res) => {
  const { username, newPassword } = req.body;
  const users = readUsers();
  if (!users[username]) return res.status(404).send({ message: 'Użytkownik nie istnieje.' });
  users[username].password = await bcrypt.hash(newPassword, 10);
  writeUsers(users);
  res.send({ message: 'Hasło zostało zaktualizowane.' });
});

app.post('/social-login', (req, res) => {
  const { provider, email } = req.body;
  const users = readUsers();
  const username = email;
  if (!users[username]) {
    users[username] = { password: null, cloud: null, token: null };
    writeUsers(users);
  }
  req.session.username = username;
  res.send({ message: `Zalogowano przez ${provider}`, user: username });
});

app.get('/cloud-settings', (req, res) => {
  const username = req.session.username;
  if (!username) return res.status(401).send('Not logged in');
  const users = readUsers();
  res.send(users[username]);
});

app.post('/cloud-settings', (req, res) => {
  const username = req.session.username;
  const { cloud, token, model } = req.body;
  if (!username) return res.status(401).send('Not logged in');
  const users = readUsers();
  users[username] = { ...users[username], cloud, token, model };
  writeUsers(users);
  res.send({ message: 'Cloud settings saved' });
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
