const express = require('express');
const User = require('./models/user');
const Post = require('./models/post');
require('./db');
const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
    console.log("Welcome");
    res.status(200).send('Start Page');
});

app.use('/user', userRoutes);

app.use('/post', postRoutes);

app.get('*', (req, res) => {
    res.status(404).send('404! This is an invalid URL.');
  });


app.listen(process.env.PORT, () => console.log(`Listening on port 4000`))