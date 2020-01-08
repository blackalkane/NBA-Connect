import React from 'react';
import LoremIpsum from '../LoremIpsum';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { render } from "react-dom";
import { makeData } from "./StatsMaker";
import StatsTeamDraggableTable from "./StatsTeamDraggableTable";
import { fetchData } from '../../actions'
import { connect } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import axios from 'axios';

class StatsTeamsTable extends React.Component {
	state = {
		columns: [
			{
				Header: "Name",
				accessor: "teamName",
				show: true,
				width: 150,
				filterable: true,
				filterMethod: (filter, row) => {
					return row[filter.id].toLowerCase().includes(filter.value)
				}
			},
			{
				Header: "City",
				accessor: "teamCity",
				show: true,
				width: 150,
				filterable: true,
				filterMethod: (filter, row) => {
					return row[filter.id].toLowerCase().includes(filter.value)
				}
			},
			{
				Header: "Season",
				accessor: "season",
				show: true,
				width: 180,
				filterable: true,
				filterMethod: (filter, row) => {
					if (filter.value === "2018-19Playoff") {
						return row[filter.id] == "2018-19Playoff";
					} else if (filter.value === "2018-19Regular") {
						return row[filter.id] == "2018-19Regular";
					} else if (filter.value === "2017-18Playoff") {
						return row[filter.id] == "2017-18Playoff";
					} else if (filter.value === "2017-18Regular") {
						return row[filter.id] == "2017-18Regular";
					}
				},
				Filter: ({ filter, onChange }) =>
					<select
						onChange={event => onChange(event.target.value)}
						style={{ width: "100%" }}
						value={filter ? filter.value : "2018-19Playoff"}
					>
						<option value="2018-19Playoff">2018-19Playoff</option>
						<option value="2018-19Regular">2018-19Regular</option>
						<option value="2017-18Playoff">2017-18Playoff</option>
						<option value="2017-18Regular">2017-18Regular</option>
					</select>
			},
			{
				Header: "Wins",
				accessor: "wins",
				show: true,
				width: 100,
				filterable: true
			},
			{
				Header: "Losses",
				accessor: "losses",
				show: true,
				width: 100,
				filterable: true
			},
			{
				Header: "Win%",
				accessor: "winPct",
				show: true,
				width: 100,
				filterable: true
			},
			{
				Header: "2pt Att",
				accessor: "fg2PtAtt",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "2pt Att Avg",
				accessor: "fg2PtAttPerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "2 Made",
				accessor: "fg2PtMade",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "2 Made Avg",
				accessor: "fg2PtMadePerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "2pt %",
				accessor: "fg2PtPct",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "3pt Att",
				accessor: "fg3PtAtt",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "3 Att Avg",
				accessor: "fg3PtAttPerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "3 Made",
				accessor: "fg3PtMade",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "3 Made Avg",
				accessor: "fg3PtMadePerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "3pt %",
				accessor: "fg3PtPct",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Total Att",
				accessor: "fgAtt",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Total Att Avg",
				accessor: "fgAttPerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Total Pt Made",
				accessor: "fgMade",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Total Pt Made Avg",
				accessor: "fgMadePerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Total %",
				accessor: "fgPct",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "1pt Att",
				accessor: "ftAtt",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "1 Att Avg",
				accessor: "ftAttPerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "1 Made",
				accessor: "ftMade",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "1 Made- vg",
				accessor: "ftMadePerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "1pt %",
				accessor: "ftPct",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "OffReb",
				accessor: "offReb",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "OffReb Avg",
				accessor: "offRebPerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "DefReb",
				accessor: "defReb",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "DefReb Avg",
				accessor: "defRebPerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Rebound",
				accessor: "reb",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Reb Avg",
				accessor: "rebPerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Assist",
				accessor: "ast",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Ast Avg",
				accessor: "astPerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Points",
				accessor: "pts",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Pts Avg",
				accessor: "ptsPerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Turnover",
				accessor: "tov",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Tov Avg",
				accessor: "tovPerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Steal",
				accessor: "stl",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Stl Avg",
				accessor: "stlPerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Block",
				accessor: "blk",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Blk Avg",
				accessor: "blkPerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Blk Against",
				accessor: "blkAgainst",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Blk Against Avg",
				accessor: "blkAgainstPerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Pts Against",
				accessor: "ptsAgainst",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Pts Against Avg",
				accessor: "ptsAgainstPerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Games Back",
				accessor: "gamesBack",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Games Played",
				accessor: "gamesPlayed",
				show: false,
				width: 100,
				filterable: true
			}
		],
		teams: []
	}

	componentDidMount() {
		axios.get('https://cpsc436basketballapi.herokuapp.com/data/getTeams')
			.then(res => {
				this.setState({
					teams: res.data
				})
			});
	}

	tableScrollTop = 0;
	data = makeData();
	displayCol = e => {
		const cols = this.state.columns.map((col, i) => e === i ? { ...col, show: !col.show } : col)
		this.setState({
			columns: cols
		});
	}
	checkShow(i) {
		return this.state.columns[i].show ? 'button is-info is-small dropdown-item' : 'button is-small dropdown-item';
	}

	createTeamObj = teams => {
		var teamsData = []
		teams.map(function (team) {
			teamsData.push({
				gamesPlayed: team["stats"]["gamesPlayed"],
				teamCity: team["teamCity"],
				teamName: team["teamName"],
				season: team["season"],
				fg2PtAtt: team["stats"]["fieldGoals"]["fg2PtAtt"],
				fg2PtAttPerGame: team["stats"]["fieldGoals"]["fg2PtAttPerGame"],
				fg2PtMade: team["stats"]["fieldGoals"]["fg2PtMade"],
				fg2PtMadePerGame: team["stats"]["fieldGoals"]["fg2PtMadePerGame"],
				fg2PtPct: team["stats"]["fieldGoals"]["fg2PtPct"],
				fg3PtAtt: team["stats"]["fieldGoals"]["fg3PtAtt"],
				fg3PtAttPerGame: team["stats"]["fieldGoals"]["fg3PtAttPerGame"],
				fg3PtMade: team["stats"]["fieldGoals"]["fg3PtMade"],
				fg3PtMadePerGame: team["stats"]["fieldGoals"]["fg3PtMadePerGame"],
				fg3PtPct: team["stats"]["fieldGoals"]["fg3PtPct"],
				fgAtt: team["stats"]["fieldGoals"]["fgAtt"],
				fgAttPerGame: team["stats"]["fieldGoals"]["fgAttPerGame"],
				fgMade: team["stats"]["fieldGoals"]["fgMade"],
				fgMadePerGame: team["stats"]["fieldGoals"]["fgMadePerGame"],
				fgPct: team["stats"]["fieldGoals"]["fgPct"],
				ftAtt: team["stats"]["freeThrows"]["ftAtt"],
				ftAttPerGame: team["stats"]["freeThrows"]["ftAttPerGame"],
				ftMade: team["stats"]["freeThrows"]["ftMade"],
				ftMadePerGame: team["stats"]["freeThrows"]["ftMadePerGame"],
				ftPct: team["stats"]["freeThrows"]["ftPct"],
				offReb: team["stats"]["rebounds"]["offReb"],
				offRebPerGame: team["stats"]["rebounds"]["offRebPerGame"],
				defReb: team["stats"]["rebounds"]["defReb"],
				defRebPerGame: team["stats"]["rebounds"]["defRebPerGame"],
				reb: team["stats"]["rebounds"]["reb"],
				rebPerGame: team["stats"]["rebounds"]["rebPerGame"],
				ast: team["stats"]["offense"]["ast"],
				astPerGame: team["stats"]["offense"]["astPerGame"],
				pts: team["stats"]["offense"]["pts"],
				ptsPerGame: team["stats"]["offense"]["ptsPerGame"],
				tov: team["stats"]["defense"]["tov"],
				tovPerGame: team["stats"]["defense"]["tovPerGame"],
				stl: team["stats"]["defense"]["stl"],
				stlPerGame: team["stats"]["defense"]["stlPerGame"],
				blk: team["stats"]["defense"]["blk"],
				blkPerGame: team["stats"]["defense"]["blkPerGame"],
				blkAgainst: team["stats"]["defense"]["blkAgainst"],
				blkAgainstPerGame: team["stats"]["defense"]["blkAgainstPerGame"],
				ptsAgainst: team["stats"]["defense"]["ptsAgainst"],
				ptsAgainstPerGame: team["stats"]["defense"]["ptsAgainstPerGame"],
				wins: team["stats"]["standings"]["wins"],
				losses: team["stats"]["standings"]["losses"],
				winPct: team["stats"]["standings"]["winPct"],
				gamesBack: team["stats"]["standings"]["gamesBack"],
				teamAbbr: team["teamAbbr"]
			});
			return;
		});
		return teamsData;
	}

	render() {
		const { data } = this.props;
		return (
			<div>
				<div>
					<div className="dropdown is-hoverable">
						<div className="dropdown-trigger">
							<button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
								<span>Main</span>
								<span className="icon is-small">
									<i className="fas fa-angle-down" aria-hidden="true"></i>
								</span>
							</button>
						</div>
						<div className="dropdown-menu" id="dropdown-menu" role="menu">
							<div className="dropdown-content">
								<a className={this.checkShow(0)} onClick={() => this.displayCol(0)}>Name</a>
								<a className={this.checkShow(1)} onClick={() => this.displayCol(1)}>City</a>
								<a className={this.checkShow(2)} onClick={() => this.displayCol(2)}>Season</a>
								<a className={this.checkShow(3)} onClick={() => this.displayCol(3)}>Wins</a>
								<a className={this.checkShow(4)} onClick={() => this.displayCol(4)}>Losses</a>
								<a className={this.checkShow(5)} onClick={() => this.displayCol(5)}>Win%</a>
								<a className={this.checkShow(46)} onClick={() => this.displayCol(46)}>Games Back</a>
								<a className={this.checkShow(47)} onClick={() => this.displayCol(47)}>Games Played</a>
							</div>
						</div>
					</div>
					<div className="dropdown is-hoverable">
						<div className="dropdown-trigger">
							<button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
								<span>Field Goals</span>
								<span className="icon is-small">
									<i className="fas fa-angle-down" aria-hidden="true"></i>
								</span>
							</button>
						</div>
						<div className="dropdown-menu" id="dropdown-menu" role="menu">
							<div className="dropdown-content">
								<a className={this.checkShow(6)} onClick={() => this.displayCol(6)}>2pt Att</a>
								<a className={this.checkShow(7)} onClick={() => this.displayCol(7)}>2pt Att Avg</a>
								<a className={this.checkShow(8)} onClick={() => this.displayCol(8)}>2 Made</a>
								<a className={this.checkShow(9)} onClick={() => this.displayCol(9)}>2 Made Avg</a>
								<a className={this.checkShow(10)} onClick={() => this.displayCol(10)}>2pt %</a>
								<a className={this.checkShow(11)} onClick={() => this.displayCol(11)}>3pt Att</a>
								<a className={this.checkShow(12)} onClick={() => this.displayCol(12)}>3 Att Avg</a>
								<a className={this.checkShow(13)} onClick={() => this.displayCol(13)}>3 Made</a>
								<a className={this.checkShow(14)} onClick={() => this.displayCol(14)}>3 Made Avg</a>
								<a className={this.checkShow(15)} onClick={() => this.displayCol(15)}>3pt %</a>
								<a className={this.checkShow(16)} onClick={() => this.displayCol(16)}>Total Att</a>
								<a className={this.checkShow(17)} onClick={() => this.displayCol(17)}>Total Att Avg</a>
								<a className={this.checkShow(18)} onClick={() => this.displayCol(18)}>Total Pt Made</a>
								<a className={this.checkShow(19)} onClick={() => this.displayCol(19)}>Total Pt Made Avg</a>
								<a className={this.checkShow(20)} onClick={() => this.displayCol(20)}>Total %</a>
							</div>
						</div>
					</div>
					<div className="dropdown is-hoverable">
						<div className="dropdown-trigger">
							<button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
								<span>Free Throws</span>
								<span className="icon is-small">
									<i className="fas fa-angle-down" aria-hidden="true"></i>
								</span>
							</button>
						</div>
						<div className="dropdown-menu" id="dropdown-menu" role="menu">
							<div className="dropdown-content">
								<a className={this.checkShow(21)} onClick={() => this.displayCol(21)}>1pt Att</a>
								<a className={this.checkShow(22)} onClick={() => this.displayCol(22)}>1 Att Avg</a>
								<a className={this.checkShow(23)} onClick={() => this.displayCol(23)}>1 Made</a>
								<a className={this.checkShow(24)} onClick={() => this.displayCol(24)}>1 Made Avg</a>
								<a className={this.checkShow(25)} onClick={() => this.displayCol(25)}>1pt %</a>
							</div>
						</div>
					</div>
					<div className="dropdown is-hoverable">
						<div className="dropdown-trigger">
							<button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
								<span>Rebound</span>
								<span className="icon is-small">
									<i className="fas fa-angle-down" aria-hidden="true"></i>
								</span>
							</button>
						</div>
						<div className="dropdown-menu" id="dropdown-menu" role="menu">
							<div className="dropdown-content">
								<a className={this.checkShow(26)} onClick={() => this.displayCol(26)}>OffReb</a>
								<a className={this.checkShow(27)} onClick={() => this.displayCol(27)}>OffReb Avg</a>
								<a className={this.checkShow(28)} onClick={() => this.displayCol(28)}>DefReb</a>
								<a className={this.checkShow(29)} onClick={() => this.displayCol(29)}>DefReb Avg</a>
								<a className={this.checkShow(30)} onClick={() => this.displayCol(30)}>Rebound</a>
								<a className={this.checkShow(31)} onClick={() => this.displayCol(31)}>Reb Avg</a>
							</div>
						</div>
					</div>
					<div className="dropdown is-hoverable">
						<div className="dropdown-trigger">
							<button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
								<span>Offense</span>
								<span className="icon is-small">
									<i className="fas fa-angle-down" aria-hidden="true"></i>
								</span>
							</button>
						</div>
						<div className="dropdown-menu" id="dropdown-menu" role="menu">
							<div className="dropdown-content">
								<a className={this.checkShow(32)} onClick={() => this.displayCol(32)}>Assist</a>
								<a className={this.checkShow(33)} onClick={() => this.displayCol(33)}>Ast Avg</a>
								<a className={this.checkShow(34)} onClick={() => this.displayCol(34)}>Points</a>
								<a className={this.checkShow(35)} onClick={() => this.displayCol(35)}>Pts Avg</a>
							</div>
						</div>
					</div>
					<div className="dropdown is-hoverable">
						<div className="dropdown-trigger">
							<button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
								<span>Defense</span>
								<span className="icon is-small">
									<i className="fas fa-angle-down" aria-hidden="true"></i>
								</span>
							</button>
						</div>
						<div className="dropdown-menu" id="dropdown-menu" role="menu">
							<div className="dropdown-content">
								<a className={this.checkShow(36)} onClick={() => this.displayCol(36)}>Turnover</a>
								<a className={this.checkShow(37)} onClick={() => this.displayCol(37)}>Tov Avg</a>
								<a className={this.checkShow(38)} onClick={() => this.displayCol(38)}>Steal</a>
								<a className={this.checkShow(39)} onClick={() => this.displayCol(39)}>Stl Avg</a>
								<a className={this.checkShow(40)} onClick={() => this.displayCol(40)}>Block</a>
								<a className={this.checkShow(41)} onClick={() => this.displayCol(41)}>Blk Avg</a>
								<a className={this.checkShow(42)} onClick={() => this.displayCol(42)}>Blk Against</a>
								<a className={this.checkShow(43)} onClick={() => this.displayCol(43)}>Blk Against Avg</a>
								<a className={this.checkShow(44)} onClick={() => this.displayCol(44)}>Pts Against</a>
								<a className={this.checkShow(45)} onClick={() => this.displayCol(45)}>Pts Against Avg</a>
							</div>
						</div>
					</div>
				</div>
				<br />
				<LoadingOverlay
					active={this.state.teams.length === 0}
					spinner
					text="loading Data... Tip: use <, >, = to filter!"
				>
				<StatsTeamDraggableTable
					rows={this.createTeamObj(this.state.teams)}
					columns={this.state.columns}
					defaultPageSize={20}
					defaultFilterMethod={(filter, row) => {
						if (filter.value.includes(">=")) {
							return row[filter.id] >= filter.value.slice(2);
						} else if (filter.value.includes('>')) {
							return row[filter.id] > filter.value.slice(1);
						} else if (filter.value.includes("<=")) {
							return row[filter.id] <= filter.value.slice(2);
						} else if (filter.value.includes("<")) {
							return row[filter.id] < filter.value.slice(1);
						} else {
							return row[filter.id] == filter.value;
						}
					}}
					className="-striped -highlight"
					getTableProps={() => {
						return {
							onScroll: e => {
								if (this.tableScrollTop === e.target.scrollTop) {
									let left = e.target.scrollLeft > 0 ? e.target.scrollLeft : 0;
								} else {
									this.tableScrollTop = e.target.scrollTop;
								}
							}
						};
					}}
				/>
				</LoadingOverlay>
				<br />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.playersData
	}
}

export default connect(mapStateToProps)(StatsTeamsTable);
