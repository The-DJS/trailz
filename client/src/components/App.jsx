/* eslint-disable import/extensions */
import React from 'react';
import Map from './Map.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="body">
        <h1>Hello World!</h1>
        <Map />
      </div>
    );
  }
}

export default App;
