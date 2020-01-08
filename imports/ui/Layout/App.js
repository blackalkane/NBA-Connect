import React from 'react';
import '../../css/App.css';
import Home from '../Home/Home';
import LogIn from '../LogIn/LogIn';
import Discussions from '../Discussion/Discussions';
import NavBar from './NavBar';
import About from '../About/About';
import StatsPlayers from "../Stats/StatsPlayers";
import StatsTeams from "../Stats/StatsTeams";
import StatsAnalysis from "../Stats/StatsAnalysis";
import { connect } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import PerfectScrollbar from "perfect-scrollbar";
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {

	render() {
	return(
		<LoadingOverlay
		active={this.props.loading}
		spinner
		text='Loading your content...'>
		<BrowserRouter>
			<div>
				<NavBar />
			</div>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/myAccount' component={LogIn} />
				<Route exact path='/discussions' component={Discussions} />
				<Route exact path='/about' component={About} />
				<Route exact path='/stats/players' component={StatsPlayers} />
				<Route exact path='/stats/teams' component={StatsTeams} />
				<Route exact path='/stats/analysis' component={StatsAnalysis} />
			</Switch>
		</BrowserRouter>
		</LoadingOverlay>
	);
	}
}

const mapStateToProps = (state) => { //name is by convention
	//state has entire state of app!!
  return { pageNum: state.pageNum, loading: state.loading }; //now it will appear as props
}


export default connect(mapStateToProps)(App);
