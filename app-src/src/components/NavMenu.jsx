import React, { Component } from 'react';

class NavMenu extends Component {
  render() {
    const { showPlanner, showHunts, showHunters, showStands, changePage } = this.props;

    const navMenuStyle = {
        ...this.props.style,
        border: "1px solid #000"
    };

    const getButtonStyle = function (selected) {
        let style = {
            float: "left",
            height: "100%",
            width: "calc(25% - 2px)",
            background: "#60646c",
            color: "#FFFFFF",
            cursor: "pointer",
            border: "1px solid #000"
        };

        if (selected) {
            style.background = "#1c222e";
            style.cursor = "default";
        }

        return style;
    }

    const navMenuButtonTextStyle = {
        color: "#FFFFFF",
        textAlign: "center",
        margin: "12px",
        fontSize: "1.6em"
    }

    return (
        <div style={navMenuStyle}>
            <div style={getButtonStyle(showPlanner)} onClick={() => { changePage("planner") }}>
                <p style={navMenuButtonTextStyle}>Plan Hunt</p>
            </div>
            <div style={getButtonStyle(showHunts)} onClick={() => { changePage("hunts") }}>
                <p style={navMenuButtonTextStyle}>Hunts</p>
            </div>
            <div style={getButtonStyle(showHunters)} onClick={() => { changePage("hunters") }}>
                <p style={navMenuButtonTextStyle}>Hunters</p>
            </div>
            <div style={getButtonStyle(showStands)} onClick={() => { changePage("stands") }}>
                <p style={navMenuButtonTextStyle}>Stands</p>
            </div>
        </div>
    )
  }
}

export default NavMenu;
