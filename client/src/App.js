import React, { Component } from 'react';
// import './App.css';
// import SignUpForm from './components/SignUpForm'
// import LoginForm from './components/LoginForm'
// import AccountInfoForm from './components/AccountInfoForm'
// import Wrapper from './components/Wrapper'
import API from './utils/API';
// import DirectorySection from './components/DirectorySection'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Redirect, Link } from 'react-router-dom';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

class App extends Component {
  state = {
    selectedFile: null,
    users: [],
    loggedIn: false,
		email: null,
		name: null,
    description: null,
    image: null,
		userId: null
  }

  logout = () => {
		API.logout().then(response => {
			console.log(response.data);
			if (response.status === 200) {
				this.updateUser({
					loggedIn: false,
					email: null,
					name: null,
          description: null,
          image: null,
					userId: null
				});
			}
		}).catch(err => {
			console.log(`Logout error: ${err}`);
		});
	}

  checkUser = () => {
		API.checkUser().then(response => {
			if (response.data.user) {
			  	this.setState({
					loggedIn: true,
					email: response.data.user.email,
					name: response.data.user.name,
          description: response.data.user.description,
          userId: response.data.user.userId,
          image: response.data.user.image
			  	});
			} else {
			  	this.setState({
					loggedIn: false,
					email: null,
					name: null,
					description: null,
          userId: null,
          image: null
			  	});
			}
		});
  }
  
  updateUser = (userObject) => {
    this.setState(userObject);
    this.getAllUsers();
  }

  getAllUsers = () => {
		API.getAllUsers().then(response => {
      if (response.data.users) {
        console.log(response.data.users);
        this.setState({
          users: response.data.users
        })
      }
		});
	}

  componentDidMount = () => {
    this.checkUser();
    this.getAllUsers();
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/dashboard" render={() =>
              <Dashboard 
                updateUser={this.updateUser} 
                userInfo={{
                  loggedIn: this.state.loggedIn,
                  email: this.state.email,
                  name: this.state.name,
                  description: this.state.description,
                  userId: this.state.userId,
                  users: this.state.users
                }}
              />} 
            />
            <Route exact path="*" render= {() =>
              <Home 
                updateUser={this.updateUser} 
                userInfo={{
                  loggedIn: this.state.loggedIn,
                  email: this.state.email,
                  name: this.state.name,
                  description: this.state.description,
                  userId: this.state.userId
                }}
              />} 
            />
          </Switch>
        </Router>
      </div>





      // <div className="App">
      //   <Wrapper>
      //     <div className="jumbotron">
      //       <h1>User Directory</h1>
      //     </div>
      //     {this.state.loggedIn ? (
      //         <div>
      //           <AccountInfoForm
      //             logout={this.logout}
      //             updateUser={this.updateUser} 
      //             userInfo={{
      //               loggedIn: this.state.loggedIn,
      //               email: this.state.email,
      //               name: this.state.name,
      //               description: this.state.description,
      //               userId: this.state.userId,
      //               image: this.state.image
      //             }}
      //           />
      //           <DirectorySection usersInfo={this.state.users} />
      //         </div>
      //     ):(
      //         <div className="row">
      //           <div className="col-6">
      //             <SignUpForm
      //               updateUser={this.updateUser} 
      //               userInfo={{
      //                 loggedIn: this.state.loggedIn,
      //                 email: this.state.email,
      //                 name: this.state.name,
      //                 description: this.state.description,
      //                 userId: this.state.userId,
      //                 image: this.state.image
      //               }}
      //             />
      //           </div>
      //           <div className="col-6">
      //             <LoginForm
      //               updateUser={this.updateUser} 
      //               userInfo={{
      //                 loggedIn: this.state.loggedIn,
      //                 email: this.state.email,
      //                 name: this.state.name,
      //                 description: this.state.description,
      //                 userId: this.state.userId,
      //                 image: this.state.image
      //               }}
      //             />
      //           </div>
      //         </div>
      //     )}
      //   </Wrapper>
      // </div>
    );
  }
}

export default App;
