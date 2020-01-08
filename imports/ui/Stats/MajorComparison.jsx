import React from 'react';
import MajorSingleDisplay from './MajorSingleDisplay';
import MultipleDisplay from './MultipleDisplay';

class MajorComparison extends React.Component {
  render() {
    const { count, dataR, dataP } = this.props;
    if (count === 1) {
      return (
        <div className="container">
          <MajorSingleDisplay dataR={dataR} dataP={dataP} />
        </div>
        );
    } else if (count === 0) {
      return (
        <div className="container">
        </div>
      )
    } else {
      return (
        <div className="container">
          <MultipleDisplay dataR={dataR} dataP={dataP} />
        </div>
      )
    }
  }
}

export default MajorComparison;
