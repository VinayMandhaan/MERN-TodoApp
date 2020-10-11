import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Auth/Login/Login'
import Signup from './components/Auth/Signup/Signup'
import Header from './components/Nav/Navbar';
import Task from './components/Task/Task'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Signup} />
      <Route exact path="/task" component={Task} />
      <Route exact path="/home" component={Header} />
    </Router>
  );
}

export default App;
