// Dependecies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Setup express app
const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('frontend/build'));
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/userDirectory_app';
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Start server
app.listen(PORT, function() {
	console.log(`API Server now listening on PORT ${PORT}!`);
});