const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const crypto = require('crypto');

// Setup express app
const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('frontend/build'));
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method')); 
app.use(passport.initialize());
app.use(passport.session());

// User model
const User = require('./models').User;

// Config Passport
require('./config/passport/passport.js')(passport, User);

// Create User Controller
const userController = require('./controllers/userController.js')(User);

// Connect MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/userDirectory_app';
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
// const conn = mongoose.createConnection(MONGODB_URI, { useNewUrlParser: true });

// // Init gfs
// let gfs;

// conn.once('open', () => {
// 	// Init Stream
// 	gfs = Grid(conn.db, mongoose.mongo);
// 	gfs.collection('uploads');
// })

// // Create storage engine to accomidate uploaded files with same names
// const storage = new GridFsStorage({
// 	url: MONGODB_URI,
// 	file: (req, file) => {
// 	  return new Promise((resolve, reject) => {
// 		crypto.randomBytes(16, (err, buf) => {
// 		  if (err) {
// 			return reject(err);
// 		  }
// 		  const filename = buf.toString('hex') + path.extname(file.originalname);
// 		  const fileInfo = {
// 			filename: filename,
// 			bucketName: 'uploads'
// 		  };
// 		  resolve(fileInfo);
// 		});
// 	  });
// 	}
// });
// const upload = multer({ storage });

  // Create Router
const router = require('./routes')(express, passport, userController);

// Use Router
app.use(router);


// Start server
app.listen(PORT, function() {
	console.log(`API Server now listening on PORT ${PORT}!`);
});