import React from 'react';
import StatsPlayersTable from "./StatsPlayersTable";

class StatsPlayers extends React.Component {
  render() {
    return (
      <div className="container">
        <StatsPlayersTable />
        <footer className="footer">
			  <div className="content has-text-centered">
						<p>Copyright© by Tony Chen, Peter Han and Yuting Wen</p>
			  </div>
			</footer>
    </div>
      );
  }
}

export default StatsPlayers;
