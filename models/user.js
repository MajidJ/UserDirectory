const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bCrypt = require('bcrypt-nodejs');
mongoose.promise = Promise;

//User schema
const userSchema = new Schema({
	name: String,
	description: String,
	email: String,
	image: { data: Buffer, contentType: String },
	password: String,
	passwordResetToken: String,
	passwordResetTokenExpiration: Date,
	dateCreated: { 
		type: Date,
		default: Date.now
	}
});

// Schema methods for password
userSchema.methods = {
	checkPassword: function(inputPassword){
		return bCrypt.compareSync(inputPassword, this.password);
	},
	hashPassword: plainTextPassword => {
		return bCrypt.hashSync(plainTextPassword, bCrypt.genSaltSync(8), null);
	}
};

// Define hooks for pre-saving
userSchema.pre('save', function(next){
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======');
		next();
	} else if (this.password.charAt(0) !== '$') {
		this.password = this.hashPassword(this.password);
		next();
	} else {
		next();
	}
});


const User = mongoose.model('User', userSchema);

module.exports = User;
