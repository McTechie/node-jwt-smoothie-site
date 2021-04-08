const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

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

// cookies
// app.get('/set-cookie', (req, res) => {
  
//   // general method
//   // res.setHeader('Set-Cookie', 'newUser=true');
  
//   // using cookie-parser to access the cookie on response object
//   res.cookie('newUser', false);
  
//   // setting cookie for one day and access only with HTTPS
//   // res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, secure: true });

//   // setting cookie for one day and access only via client and server using HTTP (not browser)
//   res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
  
//   res.send('you got the cookiee!');

// });

// app.get('/read-cookie', (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies.newUser);
//   res.json(cookies);
// });