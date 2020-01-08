import React, { Component } from 'react';
import DropdownSearchBar from './DropdownSearchBar';
import MinorComparison from './MinorComparison';
import LoadingOverlay from 'react-loading-overlay';
import axios from 'axios';

class StatsAnalysis extends Component {

  state = {
    players: []
  }

  componentDidMount() {
    axios.get('https://cpsc436basketballapi.herokuapp.com/data/getPlayers')
      .then(res => {
        this.setState({
          players: res.data
        })
      });
  }

  render() {
    return (
      <div className="container">
        <LoadingOverlay
          active={this.state.players.length === 0}
          spinner
          text="loading Data..."
        >
        <DropdownSearchBar data={this.state.players}/>
        </LoadingOverlay>
        <footer className="footer">
			  <div className="content has-text-centered">
						<p>Copyright© by Tony Chen, Peter Han and Yuting Wen</p>
			  </div>
			</footer>
      </div>
    )
  }
}

export default StatsAnalysis;
