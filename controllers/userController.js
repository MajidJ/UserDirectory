module.exports = function(User) {
    return {
        signUp: function(email, res, name, description, password, image){
            User.findOne({ email: email }, (err, user) => {
                if (err) {
                    console.log('User signup db search error: ', err);
                    res.status(422).send(err);
                } else if (user) {
                    res.send({
                        error: `Sorry, there is already a user with the email address: ${email}`
                    });
                }
                else {

                    const newUser = new User({
                        name: name,
                        email: email,
                        description: description,
                        password: password,
                        image: image
                    });
                    newUser.save((err) => {
                        if (err) return res.status(422).send(err);
                        res.send('Success');
                    });
                }
            });
        },
        findLoggedInUser: function(userId, res){
			User.findById({_id: userId}, (err, user) => {
				if (err) {
					res.send(err);
				} else {
                    res.send({
                        user: {
                            userId: user._id,
                            email: user.email,
                            name: user.name,
                            description: user.description
                        }
                    });
				}
			});
        },
        getAllUsers: function(res){
			User.find({}, (err, users) => {
				if (err) {
					res.send(err);
				} else {
                    res.send({
                        users: users
                    });
				}
			});
		},
        updateUserInfo: function(userId, name, description, email, res, image){
			User.findOneAndUpdate({ _id: userId }, {
				$set: {
                    name: name,
                    email: email,
                    description: description,
                    image: image
				}
			}, (err, user) => { 
				if (err) {
					res.status(422).send(err);
				} else if (!user) {
					res.status(422).send('Something went wrong.');
				} else {
					res.send({
                        name: name,
                        email: email,
                        description: description,
                        image: image
					});
				}
			});
        },
    }
}