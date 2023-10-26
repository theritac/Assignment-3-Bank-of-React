/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';
// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  //adding new debit card into the list
  addDebit = (newDebit) => {
    this.setState((prevState) => ({
      debitList: [...prevState.debitList, newDebit],
    }));
  }

  //adding new credit card into the list
  addCredit = (newCredit) => {
    this.setState((prevState) => ({
      creditList: [...prevState.creditList, newCredit],
    }));
    
  }

  //API request to get credit and debit info
  async componentDidMount() {
    let linkToCreditAPI = 'https://johnnylaicode.github.io/api/credits.json';

    try {  // Accept success response as array of JSON objects (users)
      let cresponse = await axios.get(linkToCreditAPI);
      console.log(cresponse);  // Print out response
      // To get data object in the response, need to use "response.data"
      this.setState({creditList: cresponse.data});  // Store received data in state's "users" object
    } 
    catch (error) {  // Print out errors at console when there is an error response
      if (error.cresponse) {
        // The request was made, and the server responded with error message and status code.
        console.log(error.cresponse.data);  // Print out error message (e.g., Not Found)
        console.log(error.cresponse.status);  // Print out error status code (e.g., 404)
      }    
    }

    //link to second API
    let linkToDeditAPI = 'https://johnnylaicode.github.io/api/debits.json';
    try {  // Accept success response as array of JSON objects (users)
      let dresponse = await axios.get(linkToDeditAPI);
      console.log(dresponse);  // Print out response
      // To get data object in the response, need to use "response.data"
      this.setState({debitList: dresponse.data});  // Store received data in state's "users" object
    } 
    catch (error) {  // Print out errors at console when there is an error response
      if (error.dresponse) {
        // The request was made, and the server responded with error message and status code.
        console.log(error.dresponse.data);  // Print out error message (e.g., Not Found)
        console.log(error.dresponse.status);  // Print out error status code (e.g., 404)
      }    
    }
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit = {this.addDebit}/>) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-starter-code">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;