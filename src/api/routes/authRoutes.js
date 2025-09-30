const express = require('express');

const fs = require('fs');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const JWT_SECRET = 'test_secret_key';

// Данные пользователей:
const usersData = require('../users.json');

router.get('/users', (req, res) => {
  return res.json(usersData);
});

// Регистрация пользователя:
// -------------------------------
router.post('/users', (req, res) => {
  const { userLogin, userPassword } = req.body;

  if (!userLogin || !userPassword) {
    return res.status(400).json({ message: 'Логин и пароль обязательны' });
  }

  // Проверка на то, что пользователь уже зарегистрирован:
  const isUserExists = usersData.some((user) => user.userLogin === userLogin);

  if (isUserExists) {
    return res.status(400).json({ message: 'Пользователь уже существует' });
  }

  // Хэширование пароля:
  const hashedPassword = bcrypt.hashSync(userPassword, 10);

  const newUser = { userLogin, userPassword: hashedPassword };

  // Работа с файлом users.json (добавление нового пользователя):
  usersData.push(newUser);

  fs.writeFileSync('./users.json', JSON.stringify(usersData, null, 2));

  res.status(201).json({ message: 'Регистрация успешна', userLogin });
});

// Авторизация пользователя:
// -------------------------------
router.post('/login', (req, res) => {
  const { userLogin, userPassword } = req.body;

  // Идентификация (проверка есть ли пользователь в системе):
  const currentUser = usersData.find((user) => user.userLogin === userLogin);

  if (!currentUser) {
    return res.status(400).json({ message: 'Некорректный логин или пароль' });
  }

  // Аутентификация (корректен ли пароль):
  const isValid = bcrypt.compareSync(userPassword, currentUser.userPassword);

  if (!isValid) {
    return res.status(400).json({ message: 'Некорректный логин или пароль' });
  }

  // Генерация токена:
  const token = jwt.sign({ userLogin }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Успешный вход', token, userLogin });
});

module.exports = router;
