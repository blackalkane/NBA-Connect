import React, { Component } from 'react';
import createG2 from 'g2-react';

  const Chart = createG2(chart => {
    chart.col('cost', {
      min: 0
    });
    chart.coord('polar');
    chart.axis('cost', {
      labels: null
    });
    chart.axis('stats', {
      gridAlign: 'middle',
      labelOffset: 10,
      labels: {
        label: {
          textAlign: 'center'
        }
      }
    });
    chart.legend('stats', {
      itemWrap: true
    });
    chart.interval().position('stats*cost')
      .color('stats','rgb(153,153,255)-rgb(0,0,204)')
      .label('cost',{offset: -15,label: {textAlign: 'center', fontWeight: 'bold'}})
      .style({
        lineWidth: 1,
        stroke: '#fff'
      });
    chart.render();
  });

  export default class SinglePlayerGraph extends Component{

    state ={
      forceFit: true,
      width: 500,
      height: 580,
      plotCfg: {
        margin: [35, 140, 35, 0]
      },
    }

    render() {
      return (
        <div>
          <Chart
            data={this.props.selectedPlayerInfo}
            width={this.state.width}
            height={this.state.height}
            plotCfg={this.state.plotCfg}
            forceFit={this.state.forceFit} />
        </div>
      );
    }
  }
