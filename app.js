const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/db');

const users = require('./routes/users');

mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
  console.log('Connected to DB : ' + config.database);
});
const app = express();
const port = 7000;

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));
// CORS Middleware
app.use(cors());
// BodyParser
app.use(bodyParser.json());
// Passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', users);

// app.get('/', (req, res) => {
//   res.sendfile('./public/index.html');
// });

app.listen(port, () => {
  console.log('Server is running on ' + port);
});