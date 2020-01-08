import React from "react";
import {G2,Chart,Geom,Axis,Tooltip,Coord,Label,Legend,View,Guide,Shape,Facet,Util} from "bizcharts";
import DataSet from "@antv/data-set";

export default class Groupedcolumn extends React.Component {

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
      var GMSC = (PTS + 0.7*OREB + 0.3*DREB + 0.7*AST + STL + 0.7*BLK) + 0.4*FGM - 0.7*FGA - 0.4*(FTA-FTM) - TOV - 0.4*PF;
      var EFG = (FGM + 0.5*player["stats"]["fieldGoals"]["fg3PtMadePerGame"]) / FGA;
      var TS = PTS / (2* (FGA + 0.44*FTA));

      playersData.push({
        name: player["player"]["firstName"] + " " + player["player"]["lastName"] + " " + player["season"],
        blk: player["stats"]["defense"]["blk"],
        blkAgainst: player["stats"]["defense"]["blkAgainst"],
        blkAgainstPerGame: player["stats"]["defense"]["blkAgainstPerGame"],
        blkPerGame: player["stats"]["defense"]["blkPerGame"],
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
        fgPct: player["stats"]["fieldGoals"]["fgMadePerGame"],
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
    const { players } = this.props;
    const displayData = this.createPlayerObj(players);
    const ds = new DataSet();
    const dv = ds.createView().source(displayData);
    dv.transform({
      type: "fold",
      fields: ["blkPerGame", "stlPerGame", "tovPerGame", "fg2PtMadePerGame",
              "fg3PtMadePerGame", "ftMadePerGame", "astPerGame", "ptsPerGame", "defRebPerGame",
              "offRebPerGame","rebPerGame","eFG","ts"],
      key: "datatype",
      value: "datavalue"
    });
    return (
      <div>
        <Chart height={400} data={dv} forceFit>
          <Axis name="datatype" />
          <Axis name="datavalue" />
          <Legend />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="interval"
            position="datatype*datavalue"
            color={"name"}
            adjust={[
              {
                type: "dodge",
                marginRatio: 1 / 32
              }
            ]}
          />
        </Chart>
      </div>
    );
  }
}
