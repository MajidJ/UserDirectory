import axios from 'axios';

export default {
	checkUser: function(){
		return axios.get('/user');
	},
	getAllUsers: function(){
		return axios.get('/user/directory');
	},
	signUp: function(signUpInfo){
		return axios.post('/user/signup', signUpInfo);
	},
	login: function(signInInfo){
		return axios.post('/user/signin', signInInfo);
	},
	logout: function(){
		return axios.post('/user/signout');
	},
	updateUserInfo: function(userId, name, description, email, image){
		return axios.put(`/user/update/${userId}`, {
			name,
			description,
			email,
			image
		});
	},
	imageUpload: function(userId, image){
		return axios.put(`/user/image/${userId}`, image);
	},
}