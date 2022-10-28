const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('./models/post');
const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(express.urlencoded({extended: false}));


const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database is connected'))
    .catch((err) => console.log(err));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


app.get('/', (req, res) => {
    console.log("Welcome");
    res.send('Start Page');
});

app.use('/user', userRoutes);

app.use('/post', postRoutes);

app.get('*', (req, res) => {
    res.send('404! This is an invalid URL.');
  });


app.listen(process.env.PORT, () => console.log(`Listening on port 4000`))