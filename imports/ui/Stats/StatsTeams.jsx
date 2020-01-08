import React from 'react';
import StatsTeamsTable from "./StatsTeamsTable";

class StatsTeams extends React.Component {
  render() {
    return (
      <div className="container">
        <StatsTeamsTable />
        <footer className="footer">
			  <div className="content has-text-centered">
						<p>Copyright© by Tony Chen, Peter Han and Yuting Wen</p>
			  </div>
			</footer>
    </div>
      );
  }
}

export default StatsTeams;
