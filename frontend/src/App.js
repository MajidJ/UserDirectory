import React, { Component } from 'react';
import './App.css';
import SignUpForm from './components/SignUpForm'
// import LoginForm from './components/LoginForm'
// import AccountInfoForm from './components/AccountInfoForm'
import Wrapper from './components/Wrapper'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Wrapper>
          <SignUpForm/>
          {/* <LoginForm/>
          <AccountInfoForm/> */}
        </Wrapper>
      </div>
    );
  }
}

export default App;
