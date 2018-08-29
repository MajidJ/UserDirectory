const path = require('path');

module.exports = function(express, passport, userController){

	const router = express.Router();

	// Get info for logged in user 
	router.get('/user', (req, res) => {
		if (req.user) {
			userController.findLoggedInUser(req.user._id, res);
		} else {
			res.send({ user: null });
		}
    });
    
    // Get all users in db
	router.get('/user/directory', (req, res) => {
			userController.getAllUsers(res);
	});

	// Sign-up new user
	router.post('/user/signup', (req, res) => {
		userController.signUp(req.body.email, res, req.body.name, req.body.description, req.body.password, req.body.image);
	});

	// Sign-in user
	router.post('/user/signin', passport.authenticate('local', {
		failureRedirect: '/user/signin/failure',
		failureFlash: true
	}), (req, res) => {
		const userInfo = {
			id: req.user._id,
			email: req.user.email,
			name: req.user.name,
            description: req.user.description,
            image: req.user.image
		};
		res.send(userInfo);
	});

	// Update user info
	router.put('/user/update/:userId', function(req, res){
        userController.updateUserInfo(req.params.userId, req.body.name, req.body.description, req.body.email, res, req.body.image);
	});

	router.post('/user/image/:userId', function(req, res){
        userController.uploadImage(req.params.userId, req.body.image);
	});

	// Commented Code: attempt at using multer upload for single file upload to file collection
	// router.post('/upload', upload.single('file'), (req, res) => {
	// 	res.json({ file: req.file });
	// 	// res.redirect('/');
	// });

	// Sign-out user
	router.post('/user/signout', (req, res) => {
		if (req.user) {
			req.logout();
			res.send({ message: 'Logging out' });
		} else {
			res.send({ message: 'No user to log out' });
		}
	});

	//React App
	if (process.env.NODE_ENV === 'production') {
		router.get('*', function(req, res) {
			res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
		});
	}

	return router;

};