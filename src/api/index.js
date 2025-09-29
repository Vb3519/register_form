const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const usersData = require('./users.json');

// Создание приложения:
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Получение данных всех пользователей:
app.get('/users', (req, res) => {
  res.json(usersData);
});

// Эндпоинт для регистрации пользователя:
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

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
