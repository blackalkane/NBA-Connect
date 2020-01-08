import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, AreaChart, Area, BarChart, Bar } from 'recharts';
import LoadingOverlay from 'react-loading-overlay';
import axios from 'axios';

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].payload.season.slice(7)}`}</p>
        <p>Match: {`${payload[0].payload.ht}(H) VS ${payload[0].payload.at}(A)`}</p>
        <p>Score: {`${payload[0].value} : ${payload[0].payload.as}`}</p>
        <p>Home Quarter Score: {`${payload[0].payload.h1s} ${payload[0].payload.h2s} ${payload[0].payload.h3s} ${payload[0].payload.h4s}`}</p>
        <p>Away Quarter Score: {`${payload[0].payload.a1s} ${payload[0].payload.a2s} ${payload[0].payload.a3s} ${payload[0].payload.a4s}`}</p>
      </div>
    );
  }
  return null;
};

export default class SingleTeamGameGraph extends React.Component {

  state = {
    games: [],
    fetching: false
  }

  componentDidMount() {
    axios.get('https://cpsc436basketballapi.herokuapp.com/data/getGames')
      .then(res => {
        this.setState({
          games: res.data,
          fetching: true
        })
      });
  }

  createRegularGamesObj = (games, teamAbbr, season) => {
    let temp;
    if (season === "2018-19Regular") temp = "2018-19Regular";
    else if (season === "2018-19Playoff") temp = "2018-19Playoff";
    else if (season === "2017-18Regular") temp = "2017-18Regular";
    else temp = "2017-18Playoff";
    var gamesData = [];
    games.map(function (game) {
      if ((game["schedule"]["homeTeam"]["abbreviation"] === teamAbbr
          || game["schedule"]["awayTeam"]["abbreviation"] === teamAbbr) &&
          game["season"] === temp) {
        var homeTeam = game["schedule"]["homeTeam"]["abbreviation"];
        var awayTeam = game["schedule"]["awayTeam"]["abbreviation"];
        var homeTeamScore = game["score"]["homeScoreTotal"];
        var awayTeamScore = game["score"]["awayScoreTotal"];
        var homeQ1Score = game["score"]["quarters"]["0"]["homeScore"];
        var homeQ2Score = game["score"]["quarters"]["1"]["homeScore"];
        var homeQ3Score = game["score"]["quarters"]["2"]["homeScore"];
        var homeQ4Score = game["score"]["quarters"]["3"]["homeScore"];
        var awayQ1Score = game["score"]["quarters"]["0"]["awayScore"];
        var awayQ2Score = game["score"]["quarters"]["1"]["awayScore"];
        var awayQ3Score = game["score"]["quarters"]["2"]["awayScore"];
        var awayQ4Score = game["score"]["quarters"]["3"]["awayScore"];
        var startTime = game["schedule"]["startTime"].toString().slice(0,10);
        var season = game["season"];
        var gameObj = {
          ht: homeTeam,
          at: awayTeam,
          hs: homeTeamScore,
          as: awayTeamScore,
          h1s: homeQ1Score,
          h2s: homeQ2Score,
          h3s: homeQ3Score,
          h4s: homeQ4Score,
          a1s: awayQ1Score,
          a2s: awayQ2Score,
          a3s: awayQ3Score,
          a4s: awayQ4Score,
          time: startTime,
          season: season
        };
        gamesData.push(gameObj);
      }
      return;
    });
    gamesData.sort(function (a,b) {
      var dateA = new Date(a.time);
      var dateB = new Date(b.time);
      return dateA - dateB;
    });
    return gamesData;
  }

  render() {
    const { teamAbbr, season } = this.props;
    var regularGames = this.createRegularGamesObj(this.state.games, teamAbbr, season);
    return (
      <div>
        <LoadingOverlay
          active={!this.state.fetching}
          spinner
          text="loading Data..."
        >
        <LineChart width={928} height={600} data={regularGames} syncId="anyId"
          margin={{
            top: 30, right: 0, left: 30, bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis type="number" domain={[70, 150]} allowDataOverflow={true} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="hs" stroke="#3073ba" fill="#3ca0cf" />
          <Brush datakey="time" height={5} stroke="#4e83e6" />
        </LineChart>
        </LoadingOverlay>
      </div>
    );
  }
}
