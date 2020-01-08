import React, { Component } from "react";
import ReactTable, { ReactTableDefaults } from "react-table";
import "react-table/react-table.css";
import Popup from "reactjs-popup";
import SinglePlayerGraph from "./SinglePlayerGraph";
import SinglePlayerFundeDataGraph from './SinglePlayerFundeDataGraph';
import DropdownSearchBar from './DropdownSearchBar';

Object.assign(ReactTableDefaults, {
  defaultPageSize: 10,
  minRows: 3
});

class StatsPlayerDraggableTable extends Component {
  constructor(props) {
    super(props);
    this.dragged = null;
    this.reorder = [];
    this.state = {
      trigger: 0,
      showPopUp: false,
      popUpData: null
    };
  }
  mountEvents() {
    const headers = Array.prototype.slice.call(
      document.querySelectorAll(".draggable-header")
    );

    headers.forEach((header, i) => {
      header.setAttribute("draggable", true);
      //the dragged header
      header.ondragstart = e => {
        e.stopPropagation();
        this.dragged = i;
      };

      header.ondrag = e => e.stopPropagation;

      header.ondragend = e => {
        e.stopPropagation();
        setTimeout(() => (this.dragged = null), 1000);
      };

      //the dropped header
      header.ondragover = e => {
        e.preventDefault();
      };

      header.ondrop = e => {
        e.preventDefault();
        const { target, dataTransfer } = e;
        this.reorder.push({ a: i, b: this.dragged });
        this.setState({ trigger: Math.random() });
      };
    });
  }
  componentDidMount() {
    this.mountEvents();
  }

  componentDidUpdate() {
    this.mountEvents();
  }

  render() {
    const { rows, columns } = this.props;
    const cols = columns.map(col => ({
      ...col,
      Header: <span className="draggable-header">{col.Header}</span>
    }));

    //run all reorder events
    this.reorder.forEach(o => cols.splice(o.a, 0, cols.splice(o.b, 1)[0]));
    //render
    return (
      <div className="esr-table">
        <ReactTable
          {...this.props}
          data={rows}
          columns={cols}
          SubComponent={row => {
            var selectedInfo = row.original;
            var PTSA = [];
            var THREEPTSA = [];
            var TOTALPTSA = [];
            var REBA = [];
            var ATA = [];
            var TSA = [];
            Object.keys(selectedInfo).forEach((e) => {
              if (e === 'fg2PtMade') {
                PTSA.push({name: '2PTMade', value: selectedInfo[e]});
              }
              if (e === 'fg2PtAtt') {
                PTSA.push({name: '2PTMissed', value: selectedInfo[e] - selectedInfo['fg2PtMade']})
              }
              if (e === 'fg3PtMade') {
                THREEPTSA.push({name: '3PTMade', value: selectedInfo[e]});
              }
              if (e === 'fg3PtAtt') {
                THREEPTSA.push({name: '3PTMissed', value: selectedInfo[e] - selectedInfo['fg3PtMade']});
              }
              if (e === 'fgMade') {
                TOTALPTSA.push({name: 'totalPTMade', value: selectedInfo[e]});
              }
              if (e === 'fgAtt') {
                TOTALPTSA.push({name: 'totalPTMissed', value: selectedInfo[e] - selectedInfo['fgMade']});
              }
              if (e === 'defReb') {
                REBA.push({name: 'offensiveReb', value: selectedInfo[e]});
              }
              if (e === 'offReb') {
                REBA.push({name: 'defensiveReb', value: selectedInfo[e]});
              }
              if (e === 'ast') {
                ATA.push({name: 'assist', value: selectedInfo[e]});
              }
              if (e === 'tov') {
                ATA.push({name: 'turnover', value: selectedInfo[e]});
              }
              if (e === 'ts') {
                TSA.push({name: 'trueShooting', value: selectedInfo[e]});
                TSA.push({name: 'trueLosing', value: 1-selectedInfo[e]});
              }
            });
            return (
              <div>
                <div className="row">
                  <div className="col-sm-4">
                    <SinglePlayerFundeDataGraph data={PTSA} />
                  </div>
                  <div className="col-sm-4">
                    <SinglePlayerFundeDataGraph data={THREEPTSA} />
                  </div>
                  <div className="col-sm-4">
                    <SinglePlayerFundeDataGraph data={TOTALPTSA} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <SinglePlayerFundeDataGraph data={REBA} />
                  </div>
                  <div className="col-sm-4">
                    <SinglePlayerFundeDataGraph data={ATA} />
                  </div>
                  <div className="col-sm-4">
                    <SinglePlayerFundeDataGraph data={TSA} />
                  </div>
                </div>
              </div>
            )
          }}
          />
      </div>
    );
  }
}

export default StatsPlayerDraggableTable;
