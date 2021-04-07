const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes');

const app = express();
const port = 3000;

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://<username>:<password>@node-jwt-smoothie-site.xjzby.mongodb.net/node-jwt-smoothies';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    app.listen(port);
    console.log(`The server is up and running on port ${port}`);
  })
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRouter);