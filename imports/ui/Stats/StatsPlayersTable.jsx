import React from 'react';
import LoremIpsum from '../LoremIpsum';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { render } from "react-dom";
import { makeData } from "./StatsMaker";
import StatsPlayerDraggableTable from "./StatsPlayerDraggableTable";
import { fetchData } from '../../actions'
import { connect } from 'react-redux';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import "../../../node_modules/bulma/css/bulma.css";

class StatsPlayersTable extends React.Component {
	state = {
		columns: [
			{
				Header: "First Name",
				accessor: "firstName",
				show: true,
				width: 150,
				filterable: true,
				filterMethod: (filter, row) => {
					return row[filter.id].toLowerCase().includes(filter.value)
				}
			},
			{
				Header: "Last Name",
				accessor: "lastName",
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
				Header: "Total %",
				accessor: "fgPct",
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
				Header: "Steal",
				accessor: "stl",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Games Played",
				accessor: "gamesPlayed",
				show: true,
				width: 120,
				filterable: true
			},
			{
				Header: "Assist",
				accessor: "ast",
				show: true,
				width: 100,
				filterable: true
			},
			{
				Header: "Points",
				accessor: "pts",
				show: true,
				width: 100,
				filterable: true
			},
			{
				Header: "Rebound",
				accessor: "reb",
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
				Header: "1pt Att",
				accessor: "ftAtt",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "1pt Att Avg",
				accessor: "ftAttPerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "1-Made",
				accessor: "ftMade",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "1-Made-Avg",
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
				Header: "Height",
				accessor: "height",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "Wight",
				accessor: "weight",
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
				Header: "Stl Avg",
				accessor: "stlPerGame",
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
				Header: "Ast Avg",
				accessor: "astPerGame",
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
				Header: "Reb Avg",
				accessor: "rebPerGame",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "PF",
				accessor: "pf",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "EFF",
				accessor: "eff",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "GmSc",
				accessor: "gmsc",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "eFG",
				accessor: "eFG",
				show: false,
				width: 100,
				filterable: true
			},
			{
				Header: "TS",
				accessor: "ts",
				show: false,
				width: 100,
				filterable: true
			}
		],
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

	tableScrollTop = 0;
	displayCol = e => {
		const cols = this.state.columns.map((col, i) => e === i ? { ...col, show: !col.show } : col)
		this.setState({
			columns: cols
		});
	}

	checkShow(i) {
		return this.state.columns[i].show ? 'button is-info is-small dropdown-item' : 'button is-small dropdown-item';
	}

	createPlayerObj = players => {
		var playersData = []
		players.map(function (player) {
			// 基础数据
			var PTS = player["stats"]["offense"]["pts"];
			var REB = player["stats"]["rebounds"]["reb"];
			var DREB = player["stats"]["rebounds"]["defReb"];
			var OREB = player["stats"]["rebounds"]["offReb"];
			var AST = player["stats"]["offense"]["ast"];
			var STL = player["stats"]["defense"]["stl"];
			var BLK = player["stats"]["defense"]["blk"];
			var TOV = player["stats"]["defense"]["tov"];
			var PF = player["stats"]["miscellaneous"]["fouls"];
			var FGA = player["stats"]["fieldGoals"]["fgAtt"];
			var FGM = player["stats"]["fieldGoals"]["fgMade"];
			var FTA = player["stats"]["freeThrows"]["ftAtt"];
			var FTM = player["stats"]["freeThrows"]["ftMade"];

			var EFF = (PTS + REB + AST + STL + BLK) - (FGA - FGM) - (FTA - FTM) - TOV;
			var GMSC = (PTS + 0.7 * OREB + 0.3 * DREB + 0.7 * AST + STL + 0.7 * BLK) + 0.4 * FGM - 0.7 * FGA - 0.4 * (FTA - FTM) - TOV - 0.4 * PF;
			var EFG = (FGM + 0.5 * player["stats"]["fieldGoals"]["fg3PtMadePerGame"]) / FGA;
			var TS = PTS / (2 * (FGA + 0.44 * FTA));

			playersData.push({
				birthDate: player["player"]["birthDate"],
				firstName: player["player"]["firstName"],
				lastName: player["player"]["lastName"],
				height: player["player"]["height"],
				weight: player["player"]["weight"],
				season: player["season"],
				blk: player["stats"]["defense"]["blk"],
				blkAgainst: player["stats"]["defense"]["blkAgainst"],
				blkAgainstPerGame: player["stats"]["defense"]["blkAgainstPerGame"],
				stl: player["stats"]["defense"]["stl"],
				stlPerGame: player["stats"]["defense"]["stlPerGame"],
				tov: player["stats"]["defense"]["tov"],
				tovPerGame: player["stats"]["defense"]["tovPerGame"],
				fg2PtAtt: player["stats"]["fieldGoals"]["fg2PtAtt"],
				fg2PtAttPerGame: player["stats"]["fieldGoals"]["fg2PtAttPerGame"],
				fg2PtMade: player["stats"]["fieldGoals"]["fg2PtMade"],
				fg2PtMadePerGame: player["stats"]["fieldGoals"]["fg2PtMadePerGame"],
				fg2PtPct: player["stats"]["fieldGoals"]["fg2PtPct"],
				fg3PtAtt: player["stats"]["fieldGoals"]["fg3PtAtt"],
				fg3PtAttPerGame: player["stats"]["fieldGoals"]["fg3PtAttPerGame"],
				fg3PtMade: player["stats"]["fieldGoals"]["fg3PtMade"],
				fg3PtMadePerGame: player["stats"]["fieldGoals"]["fg3PtMadePerGame"],
				fg3PtPct: player["stats"]["fieldGoals"]["fg3PtPct"],
				fgAtt: player["stats"]["fieldGoals"]["fgAtt"],
				fgAttPerGame: player["stats"]["fieldGoals"]["fgAttPerGame"],
				fgMade: player["stats"]["fieldGoals"]["fgMade"],
				fgMadePerGame: player["stats"]["fieldGoals"]["fgMadePerGame"],
				fgPct: player["stats"]["fieldGoals"]["fgPct"],
				gamesPlayed: player["stats"]["gamesPlayed"],
				ftAtt: player["stats"]["freeThrows"]["ftAtt"],
				ftAttPerGame: player["stats"]["freeThrows"]["ftAttPerGame"],
				ftMade: player["stats"]["freeThrows"]["ftMade"],
				ftMadePerGame: player["stats"]["freeThrows"]["ftMadePerGame"],
				ftPct: player["stats"]["freeThrows"]["ftPct"],
				ast: player["stats"]["offense"]["ast"],
				astPerGame: player["stats"]["offense"]["astPerGame"],
				pts: player["stats"]["offense"]["pts"],
				ptsPerGame: player["stats"]["offense"]["ptsPerGame"],
				defReb: player["stats"]["rebounds"]["defReb"],
				defRebPerGame: player["stats"]["rebounds"]["defRebPerGame"],
				offReb: player["stats"]["rebounds"]["offReb"],
				offRebPerGame: player["stats"]["rebounds"]["offRebPerGame"],
				reb: player["stats"]["rebounds"]["reb"],
				rebPerGame: player["stats"]["rebounds"]["rebPerGame"],
				pf: PF,
				eff: EFF,
				gmsc: GMSC,
				eFG: EFG,
				ts: TS
			});
			return;
		});
		return playersData;
	}

	render() {
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
								<a className={this.checkShow(0)} onClick={() => this.displayCol(0)}>First Name</a>
								<a className={this.checkShow(1)} onClick={() => this.displayCol(1)}>Last Name</a>
								<a className={this.checkShow(29)} onClick={() => this.displayCol(29)}>Height</a>
								<a className={this.checkShow(30)} onClick={() => this.displayCol(30)}>Weight</a>
								<a className={this.checkShow(2)} onClick={() => this.displayCol(2)}>Season</a>
								<a className={this.checkShow(3)} onClick={() => this.displayCol(3)}>Total %</a>
								<a className={this.checkShow(6)} onClick={() => this.displayCol(6)}>Game Played</a>

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
								<a className={this.checkShow(10)} onClick={() => this.displayCol(10)}>2pt Att</a>
								<a className={this.checkShow(11)} onClick={() => this.displayCol(11)}>2pt Att Avg</a>
								<a className={this.checkShow(12)} onClick={() => this.displayCol(12)}>2 Made</a>
								<a className={this.checkShow(13)} onClick={() => this.displayCol(13)}>2 Made Avg</a>
								<a className={this.checkShow(14)} onClick={() => this.displayCol(14)}>2pt %</a>
								<a className={this.checkShow(15)} onClick={() => this.displayCol(15)}>3pt Att</a>
								<a className={this.checkShow(16)} onClick={() => this.displayCol(16)}>3 Att Avg</a>
								<a className={this.checkShow(17)} onClick={() => this.displayCol(17)}>3 Made</a>
								<a className={this.checkShow(18)} onClick={() => this.displayCol(18)}>3 Made Avg</a>
								<a className={this.checkShow(19)} onClick={() => this.displayCol(19)}>3pt %</a>
								<a className={this.checkShow(20)} onClick={() => this.displayCol(20)}>Total Att</a>
								<a className={this.checkShow(21)} onClick={() => this.displayCol(21)}>Total Att Avg</a>
								<a className={this.checkShow(22)} onClick={() => this.displayCol(22)}>Total Pt Made</a>
								<a className={this.checkShow(23)} onClick={() => this.displayCol(23)}>Total Pt Made Avg</a>
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
								<a className={this.checkShow(24)} onClick={() => this.displayCol(24)}>1pt Att</a>
								<a className={this.checkShow(25)} onClick={() => this.displayCol(25)}>1 Att Avg</a>
								<a className={this.checkShow(26)} onClick={() => this.displayCol(26)}>1 Made</a>
								<a className={this.checkShow(27)} onClick={() => this.displayCol(27)}>1 Made Avg</a>
								<a className={this.checkShow(28)} onClick={() => this.displayCol(28)}>1pt %</a>
							</div>
						</div>
					</div>
					<div className="dropdown is-hoverable">
						<div className="dropdown-trigger">
							<button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
								<span>Rebounds</span>
								<span className="icon is-small">
									<i className="fas fa-angle-down" aria-hidden="true"></i>
								</span>
							</button>
						</div>
						<div className="dropdown-menu" id="dropdown-menu" role="menu">
							<div className="dropdown-content">
								<a className={this.checkShow(38)} onClick={() => this.displayCol(38)}>DefReb</a>
								<a className={this.checkShow(39)} onClick={() => this.displayCol(39)}>DefReb Avg</a>
								<a className={this.checkShow(40)} onClick={() => this.displayCol(40)}>OffReb</a>
								<a className={this.checkShow(41)} onClick={() => this.displayCol(41)}>OffReb Avg</a>
								<a className={this.checkShow(9)} onClick={() => this.displayCol(9)}>Rebound</a>
								<a className={this.checkShow(42)} onClick={() => this.displayCol(42)}>Reb Avg</a>
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
								<a className={this.checkShow(7)} onClick={() => this.displayCol(7)}>Assist</a>
								<a className={this.checkShow(36)} onClick={() => this.displayCol(36)}>Ast Avg</a>
								<a className={this.checkShow(8)} onClick={() => this.displayCol(8)}>Points</a>
								<a className={this.checkShow(37)} onClick={() => this.displayCol(37)}>Pts Avg</a>
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
								<a className={this.checkShow(34)} onClick={() => this.displayCol(34)}>Turnover</a>
								<a className={this.checkShow(35)} onClick={() => this.displayCol(35)}>Tov Avg</a>
								<a className={this.checkShow(5)} onClick={() => this.displayCol(5)}>Steal</a>
								<a className={this.checkShow(33)} onClick={() => this.displayCol(33)}>Stl Avg</a>
								<a className={this.checkShow(4)} onClick={() => this.displayCol(4)}>Block</a>
								<a className={this.checkShow(31)} onClick={() => this.displayCol(31)}>Blk Against</a>
								<a className={this.checkShow(32)} onClick={() => this.displayCol(32)}>Blk Against Avg</a>

							</div>
						</div>
					</div>
					<div className="dropdown is-hoverable">
						<div className="dropdown-trigger">
							<button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
								<span>Advanced</span>
								<span className="icon is-small">
									<i className="fas fa-angle-down" aria-hidden="true"></i>
								</span>
							</button>
						</div>
						<div className="dropdown-menu" id="dropdown-menu" role="menu">
							<div className="dropdown-content">
								<a className={this.checkShow(43)} onClick={() => this.displayCol(43)}>PF</a>
								<a className={this.checkShow(44)} onClick={() => this.displayCol(44)}>EFF</a>
								<a className={this.checkShow(45)} onClick={() => this.displayCol(45)}>GmSc</a>
								<a className={this.checkShow(46)} onClick={() => this.displayCol(46)}>eFG</a>
								<a className={this.checkShow(47)} onClick={() => this.displayCol(47)}>TS</a>

							</div>
						</div>
					</div>
				</div>
				<br />
				<LoadingOverlay
					active={this.state.players.length === 0}
					spinner
					text=
						'loading Data... Tip: you can use <, >, = to filter!!'
				>
				<StatsPlayerDraggableTable
					rows={this.createPlayerObj(this.state.players)}
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
						} else if (filter.value.includes("=")) {
							return row[filter.id] == filter.value.slice(1);
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

export default connect(mapStateToProps)(StatsPlayersTable);
