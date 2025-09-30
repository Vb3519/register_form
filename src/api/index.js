const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const fs = require('fs');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersData = require('./users.json');

// Создание приложения:
const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = 'test_secret_key';

// Получение данных всех пользователей:
// -------------------------------------------------
app.get('/users', (req, res) => {
  res.json(usersData);
});

// Эндпоинт для регистрации пользователя:
// -------------------------------------------------
app.post('/users', (req, res) => {
  const { userLogin, userPassword } = req.body;

  if (!userLogin || !userPassword) {
    return res.status(400).json({ message: 'Логин и пароль обязательны' });
  }

  // Имитация задержки ответа от сервера:
  setTimeout(() => {
    const isUserAlrdyExists = usersData.some(
      (user) => user.userLogin === userLogin
    );

    if (isUserAlrdyExists) {
      return res
        .status(400)
        .json({ message: 'Пользователь с таким логином уже существует' });
    }

    // Хэширование пароля:
    const hashedPassword = bcrypt.hashSync(userPassword, 10);

    // Добавление нового пользователя в json-файл:
    const newUser = { userLogin, userPassword };
    usersData.push(newUser);

    fs.writeFileSync('./users.json', JSON.stringify(usersData, null, 2)); // null - без модификации данных; 2 - отступы в json

    res.status(201).json({
      message: 'Пользователь успешно зарегистрирован!',
      userData: { userLogin, userPassword },
    });
  }, 2000);
});

// Логин (проверка пароля и отправка JWT-токена):
// -------------------------------------------------
app.post('/login', (req, res) => {
  const { userLogin, userPassword } = req.body;

  if (!userLogin || !userPassword) {
    return res.status(400).json({ message: 'Логин и пароль обязательны' });
  }

  const currentUser = usersData.find((user) => user.userLogin === userLogin);

  if (!currentUser) {
    return res.status(400).json({ message: 'Некорректный логин или пароль' });
  }

  const isPasswordValid = bcrypt.compareSync(
    userPassword,
    currentUser.userPassword
  );

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Некорректный логин или пароль' });
  }

  // Генерация JWT-токена:
  const token = jwt.sign({ userLogin }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Успешный вход', token, userLogin });
});

// Проверка JWT-токена:
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']; // Bearer Token (носитель)
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

// Защищенный эндпоинт:
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: `Привет, ${req.user.userLogin}`, user: req.user });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
