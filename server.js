const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

// Setup express app
const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('frontend/build'));
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// User model
const User = require('./models').User;

// Config Passport
require('./config/passport/passport.js')(passport, User);

// Create User Controller
const userController = require('./controllers/userController.js')(User);

// Create Router
const router = require('./routes')(express, passport, userController);

// Use Router
app.use(router);

// Connect MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/userDirectory_app';
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Start server
app.listen(PORT, function() {
	console.log(`API Server now listening on PORT ${PORT}!`);
});