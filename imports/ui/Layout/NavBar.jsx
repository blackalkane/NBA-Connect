import React, { Component } from 'react';
//import 'bootstrap/dist/css/bootstrap.css';
import '../../css/NavBar.css';
import { Link, Route } from 'react-router-dom';
//import {Navbar, Nav} from 'react-bootstrap';
import { connect } from 'react-redux';
import { flipPage, logOut } from '../../actions';
import Home from '../Home/Home';

import LogIn from '../LogIn/LogIn';
import About from '../About/About';
import "../../../node_modules/bulma/css/bulma.css";

class NavBar extends Component {
  render(){
    return(
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-item">
          <Link to='/'><img className="NbaLogo" src="http://backgrounddownload.com/wp-content/uploads/2018/09/nba-logo-transparent-background.jpg" /></Link>
        </div>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">
            <Link to='/'>Home</Link>
          </div>

          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link dropdown-trigger">
              <a className="is-link">Stats</a>
            </div>
            <div className="navbar-dropdown is-boxed">
                <Link to='/stats/players' className="navbar-item">Players</Link>
                <Link to='/stats/teams' className="navbar-item">Teams</Link>
                <Link to='/stats/analysis' className="navbar-item">Analysis</Link>
            </div>
          </div>

          <div className="navbar-item">
            <Link to='/about'>About</Link>
          </div>
          <div className="navbar-item">
            <Link to='/discussions'>Discussions</Link>
          </div>
          <div className="navbar-item">
            <Link to='/myAccount'>{this.props.isLoggedIn ? "My Account" : "Log In"} </Link>
          </div>
          
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <Link to='/home'><div hidden={!this.props.isLoggedIn} onClick={this.props.logOut}>Log Out</div></Link>
          </div>
        </div>
      </div>

      </nav>
    )
  }
}
const mapStateToProps = (state) => { //name is by convention
	//state has entire state of app!!
  return { pageNum: state.pageNum, isLoggedIn: state.userState.isLoggedIn, ensureRefresh: state.ensureRefresh}; //now it will appear as props
}

export default connect(mapStateToProps, {flipPage, logOut})(NavBar);
