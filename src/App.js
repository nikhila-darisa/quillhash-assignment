import React, { Fragment } from 'react';
import Chart from './components/displayChart'
function App() {
  return (
    <Fragment>
      <div className="heading">
        <h1>BTC-USD Crypto Chart- <span className="date">BITCOIN / U.S. DOLLAR</span></h1>
        <h4>Date: {new Date().toJSON().slice(0, 10)}</h4>
        <h5>X-axis - <span className="date">Present Time</span>, &nbsp;Y-axis is <span className="date">Price</span></h5>
      </div>
      <Chart />
    </Fragment>
  );
}

export default App;
