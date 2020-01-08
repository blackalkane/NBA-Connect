import React from 'react';
import { G2,Chart,Geom,Axis,Tooltip,Coord,Label,Legend,View,Guide,Shape,Facet,Util } from 'bizcharts';
import DataSet from '@antv/data-set';

export default class MajorSingleDisplay extends React.Component {

  createPlayerObj = ( dataR, dataP ) => {
    return [
      {
        item: 'stlPerGame',
        a: dataR[0]["stats"]["defense"]["stlPerGame"],
        b: dataP[0]["stats"]["defense"]["stlPerGame"],
      },
      {
        item: 'tovPerGame',
        a: dataR[0]["stats"]["defense"]["tovPerGame"],
        b: dataP[0]["stats"]["defense"]["tovPerGame"],
      },
      {
        item: 'fg2PtMadePerGame',
        a: dataR[0]["stats"]["fieldGoals"]["fg2PtMadePerGame"],
        b: dataP[0]["stats"]["fieldGoals"]["fg2PtMadePerGame"],
      },
      {
        item: 'fg3PtMadePerGame',
        a: dataR[0]["stats"]["fieldGoals"]["fg3PtMadePerGame"],
        b: dataP[0]["stats"]["fieldGoals"]["fg3PtMadePerGame"],
      },
      {
        item: 'ftMadePerGame',
        a: dataR[0]["stats"]["freeThrows"]["ftMadePerGame"],
        b: dataP[0]["stats"]["freeThrows"]["ftMadePerGame"],
      },
      {
        item: 'astPerGame',
        a: dataR[0]["stats"]["offense"]["astPerGame"],
        b: dataP[0]["stats"]["offense"]["astPerGame"],
      },
      {
        item: 'defRebPerGame',
        a: dataR[0]["stats"]["rebounds"]["defRebPerGame"],
        b: dataP[0]["stats"]["rebounds"]["defRebPerGame"],
      },
      {
        item: 'offRebPerGame',
        a: dataR[0]["stats"]["rebounds"]["offRebPerGame"],
        b: dataP[0]["stats"]["rebounds"]["offRebPerGame"],
      },
      {
        item: 'eFG',
        a: (dataR[0]["stats"]["fieldGoals"]["fgMade"] + 0.5*dataR[0]["stats"]["fieldGoals"]["fg3PtMadePerGame"])
            / dataR[0]["stats"]["fieldGoals"]["fgAtt"],
        b: (dataP[0]["stats"]["fieldGoals"]["fgMade"] + 0.5*dataP[0]["stats"]["fieldGoals"]["fg3PtMadePerGame"])
            / dataP[0]["stats"]["fieldGoals"]["fgAtt"],
      },
      {
        item: 'TS',
        a: dataR[0]["stats"]["offense"]["pts"] / (2* (dataR[0]["stats"]["fieldGoals"]["fgAtt"] + 0.44*dataR[0]["stats"]["freeThrows"]["ftAtt"])),
        b: dataP[0]["stats"]["offense"]["pts"] / (2* (dataP[0]["stats"]["fieldGoals"]["fgAtt"] + 0.44*dataP[0]["stats"]["freeThrows"]["ftAtt"])),
      },
    ];
  }

  render() {
    const {dataR, dataP} = this.props;
    const { DataView } = DataSet;
    const data = this.createPlayerObj(dataR,dataP);
    const dv = new DataView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['a', 'b'],
      key: 'user',
      value: 'score',
    });
    const cols = {
      score: {
        min: 0,
        max: 7,
      },
      user: { formatter: val => ({
        a: dataR[0]["player"]["firstName"] + " " + dataR[0]["player"]["lastName"] + " " + dataR[0]["season"],
        b: dataP[0]["player"]["firstName"] + " " + dataP[0]["player"]["lastName"] + " " + dataP[0]["season"]
      }[val]) },
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={dv}
          padding={[20, 20, 95, 20]}
          scale={cols}
          forceFit
        >
          <Coord type="polar" radius={0.8} />
          <Axis
            name="item"
            line={null}
            tickLine={null}
            grid={{
              lineStyle: {
                lineDash: null,
              },
              hideFirstLine: false,
            }}
          />
          <Tooltip />
          <Axis
            name="score"
            line={null}
            tickLine={null}
            grid={{
              type: 'polygon',
              lineStyle: {
                lineDash: null,
              },
              alternateColor: 'rgba(0, 0, 0, 0.04)',
            }}
          />
          <Legend name="user" marker="circle" offset={30} />
          <Geom type="line" position="item*score" color="user" size={2} />
          <Geom
            type="point"
            position="item*score"
            color="user"
            shape="circle"
            size={4}
            style={{
              stroke: '#fff',
              lineWidth: 1,
              fillOpacity: 1,
            }}
          />
        </Chart>
      </div>
    );
  }
}
