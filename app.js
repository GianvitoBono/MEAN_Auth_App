const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to MongoDB
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connesso al database ' + config.database);
});

mongoose.connect(config.database);
mongoose.connection.on('error', (err) => {
    console.log('DB Error: ' + err);
});

const app = express();

const users = require('./routes/users');

//Port Number
const port = 3000;

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middelware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, 'public/index.html'));
});

//Start server
app.listen(port, () => {
    console.log('Server in ascolto sulla porta: ' + port);
});