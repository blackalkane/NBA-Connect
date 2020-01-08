import React from "react";
import { G2,Chart,Geom,Axis,Tooltip,Coord,Label,Legend,View,Guide,Shape,Facet,Util } from "bizcharts";
import DataSet from "@antv/data-set";

export default class MultipleDisplay extends React.Component {

  createPlayerObj = ( dataR, dataP ) => {
    var displayData = [];
    var blkPerGame = { statstype: "blkPerGame" };
    var stlPerGame = { statstype: "stlPerGame" };
    var tovPerGame = { statstype: "tovPerGame" };
    var fg2PtMadePerGame = { statstype: "fg2PtMadePerGame" };
    var fg3PtMadePerGame = { statstype: "fg3PtMadePerGame" };
    var ftMadePerGame = { statstype: "ftMadePerGame" };
    var astPerGame = { statstype: "astPerGame" };
    var ptsPerGame = { statstype: "ptsPerGame" };
    var defRebPerGame = { statstype: "defRebPerGame" };
    var offRebPerGame = { statstype: "offRebPerGame" };
    var eFG = { statstype: "eFG" };
    var TS = { statstype: "TS" };
    dataR.map(function (player) {
      const name = player["player"]["firstName"] + " " + player["player"]["lastName"] + " " + player["season"];
      const blk = { [name]: player["stats"]["defense"]["blkPerGame"] };
      const stl = { [name]: player["stats"]["defense"]["stlPerGame"] };
      const tov = { [name]: player["stats"]["defense"]["tovPerGame"] };
      const fg2PtMade = { [name]: player["stats"]["fieldGoals"]["fg2PtMadePerGame"] };
      const fg3PtMade = { [name]: player["stats"]["fieldGoals"]["fg3PtMadePerGame"] };
      const ftMade = { [name]: player["stats"]["freeThrows"]["ftMadePerGame"] };
      const ast = { [name]: player["stats"]["offense"]["astPerGame"] };
      const pts = { [name]: player["stats"]["offense"]["ptsPerGame"] };
      const defReb = { [name]: player["stats"]["rebounds"]["defRebPerGame"] };
      const offReb = { [name]: player["stats"]["rebounds"]["offRebPerGame"] };
      const eFG1 = { [name]: (player["stats"]["fieldGoals"]["fgMade"] + 0.5*player["stats"]["fieldGoals"]["fg3PtMadePerGame"]) / player["stats"]["fieldGoals"]["fgAtt"] };
      const TS1 = { [name]: player["stats"]["offense"]["pts"] / (2* (player["stats"]["fieldGoals"]["fgAtt"] + 0.44*player["stats"]["freeThrows"]["ftAtt"])) };
      Object.assign(blkPerGame, blk);
      Object.assign(stlPerGame, stl);
      Object.assign(tovPerGame, tov);
      Object.assign(fg2PtMadePerGame, fg2PtMade);
      Object.assign(fg3PtMadePerGame, fg3PtMade);
      Object.assign(ftMadePerGame, ftMade);
      Object.assign(astPerGame, ast);
      Object.assign(ptsPerGame, pts);
      Object.assign(defRebPerGame, defReb);
      Object.assign(offRebPerGame, offReb);
      Object.assign(eFG, eFG1);
      Object.assign(TS, TS1);
      return;
    });
    dataP.map(function (player) {
      const name = player["player"]["firstName"] + " " + player["player"]["lastName"] + " " + player["season"];
      const blk = { [name]: player["stats"]["defense"]["blkPerGame"] };
      const stl = { [name]: player["stats"]["defense"]["stlPerGame"] };
      const tov = { [name]: player["stats"]["defense"]["tovPerGame"] };
      const fg2PtMade = { [name]: player["stats"]["fieldGoals"]["fg2PtMadePerGame"] };
      const fg3PtMade = { [name]: player["stats"]["fieldGoals"]["fg3PtMadePerGame"] };
      const ftMade = { [name]: player["stats"]["freeThrows"]["ftMadePerGame"] };
      const ast = { [name]: player["stats"]["offense"]["astPerGame"] };
      const pts = { [name]: player["stats"]["offense"]["ptsPerGame"] };
      const defReb = { [name]: player["stats"]["rebounds"]["defRebPerGame"] };
      const offReb = { [name]: player["stats"]["rebounds"]["offRebPerGame"] };
      const eFG1 = { [name]: (player["stats"]["fieldGoals"]["fgMade"] + 0.5*player["stats"]["fieldGoals"]["fg3PtMadePerGame"]) / player["stats"]["fieldGoals"]["fgAtt"] };
      const TS1 = { [name]: player["stats"]["offense"]["pts"] / (2* (player["stats"]["fieldGoals"]["fgAtt"] + 0.44*player["stats"]["freeThrows"]["ftAtt"])) };
      Object.assign(blkPerGame, blk);
      Object.assign(stlPerGame, stl);
      Object.assign(tovPerGame, tov);
      Object.assign(fg2PtMadePerGame, fg2PtMade);
      Object.assign(fg3PtMadePerGame, fg3PtMade);
      Object.assign(ftMadePerGame, ftMade);
      Object.assign(astPerGame, ast);
      Object.assign(ptsPerGame, pts);
      Object.assign(defRebPerGame, defReb);
      Object.assign(offRebPerGame, offReb);
      Object.assign(eFG, eFG1);
      Object.assign(TS, TS1);
      return;
    });
    displayData.push(blkPerGame);
    displayData.push(stlPerGame);
    displayData.push(tovPerGame);
    displayData.push(fg2PtMadePerGame);
    displayData.push(fg3PtMadePerGame);
    displayData.push(ftMadePerGame);
    displayData.push(astPerGame);
    displayData.push(ptsPerGame);
    displayData.push(defRebPerGame);
    displayData.push(offRebPerGame);
    displayData.push(eFG);
    displayData.push(TS);
    return displayData;
  }

  createTypes = ( dataR, dataP ) => {
    var types = [];
    dataR.map(function (player) {
      const name = player["player"]["firstName"] + " " + player["player"]["lastName"] + " " + player["season"];
      types.push(name);
      return;
    });
    dataP.map(function (player) {
      const name = player["player"]["firstName"] + " " + player["player"]["lastName"] + " " + player["season"];
      types.push(name);
      return;
    });
    return types;
  }

  createColorMap = kinds => {
    var colorGroup = [];
    colorGroup.push("#E3F4BF","#BEF7C8","#86E6C8","#36CFC9","#209BDD","#1581E6","#0860BF","#0543a6","#472f9e","#4e08a8","#7d35b8","#a824c9","#d119ce","#d40890","#bf045b","#bf0429","#bf0404");
    var loop = 0;
    var colorMap = {};
    kinds.map(function (kind) {
      Object.assign(colorMap, { [kind]: colorGroup[loop]});
      loop++;
      if (loop > 16) {
        loop = 0;
      }
      return;
    });
    return colorMap;
  }

  render() {
    const { dataR, dataP } = this.props;
    const { DataView } = DataSet;
    const data = this.createPlayerObj(dataR, dataP);
    const kinds = this.createTypes(dataR, dataP);
    const colorMap = this.createColorMap(kinds);
    const dv = new DataView();
    dv.source(data)
      .transform({
        type: "fold",
        fields: kinds,
        key: "kind",
        value: "stats",
        retains: ["statstype"]
      })
      .transform({
        type: "map",
        callback: obj => {
          const key = obj.kind;
          let temp;
          if (key.includes('Regular')) {
            temp = 'a';
          } else {
            temp = 'b';
          }
          obj.type = temp;
          return obj;
        }
      });

    const cols = {
      population: {
        tickInterval: 1000000
      }
    };
    return (
      <div>
        <Chart
          height={600}
          data={dv}
          scale={cols}
          padding="auto"
          forceFit
        >
          <Axis
            name="stats"
            label={{
              formatter: function(val) {
                return val;
              }
            }}
          />
          <Legend position="right" />
          <Tooltip />
          <Geom
            type="interval"
            position="statstype*stats"
            color={[
              "kind",
              function(kind) {
                return colorMap[kind];
              }
            ]}
            tooltip={[
              "kind*stats",
              (kind, stats) => {
                return {
                  name: kind,
                  value: stats
                };
              }
            ]}
            adjust={[
              {
                type: "dodge",
                dodgeBy: "type",
                marginRatio: 0
              },
              {
                type: "stack"
              }
            ]}
          />
        </Chart>
      </div>
    );
  }
}
