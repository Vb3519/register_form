const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Node.js роуты:
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

app.use(authRoutes);
app.use(profileRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Hey! Server is running on port ${port}`);
});
