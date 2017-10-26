import React, { Component } from 'react';
import NavMenu from './components/NavMenu';

class App extends Component {
  render() {
    const { showHome, showPlanner, showHunts, showHunters, showStands } = this.props.appState;
    const { changePage } = this.props;

    const rootStyle = {
      height: "100%",
      backgroundColor: "#887e79"
    }

    const innerContainerStyle = {
      height: "100%",
      margin: "0 16%",
      width: "68%"
    }

    const navMenuStyle = {
      width: "100%",
      float: "left"
    }

    return (
      <div style={rootStyle}>
        <div style={innerContainerStyle}>
          <NavMenu style={navMenuStyle} {...{showPlanner, showHunts, showHunters, showStands, changePage}} />
          {showPlanner && <div>Planner!</div>}
          {showHunts && <div>Hunts!</div>}
          {showHunters && <div>Hunters!</div>}
          {showStands && <div>Stands!</div>}
        </div>
      </div>
    )
  }
}

export default App;
