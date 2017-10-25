import React, { Component } from 'react';
import NavMenu from './components/NavMenu';

class App extends Component {
  render() {
    const { showHome, showPlanner, showHunts, showHunters, showStands } = this.props.appState;

    const rootStyle = {
      height: "100%",
      backgroundColor: "#887e79"
    }

    const navMenuStyle = {
      margin: "0 10%"
    }

    return (
      <div style={rootStyle}>
        <NavMenu style={navMenuStyle} {...{showPlanner, showHunts, showHunters, showStands}} />
      </div>
    )
  }
}

export default App;
