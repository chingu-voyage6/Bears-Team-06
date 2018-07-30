import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  render () { 
    return (
      <div>
      <Link className="btn btn-primary" to="/goals">Goals</Link>      
      </div>      
    );
  }
}

export default HomePage;



