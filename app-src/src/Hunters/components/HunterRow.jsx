import React, { Component } from 'react';

class HunterRow extends Component {
    render() {

        const containerStyle = {
            ...this.props.style,
            minHeight: "48px",
            lineHeight: "48px",
            background: "#bbb89e",
            padding: "8px",
            borderRadius: "16px",
            border: "2px solid #000",
            fontSize: "1.2em"
        };

        const nameStyle = {
            margin: 0,
            float: "left"
        };

        const counterStyle = {
            float: "right",
            margin: "0 0 0 16px",
            minWidth: "20%",
            textAlign: "center"
        }

        return (
            <div style={containerStyle}>
                <p style={nameStyle}>{this.props.hunter.name}</p>
                <p style={counterStyle}>Hunts: 10</p>
                <p style={counterStyle}>Observed: 10</p>
                <p style={counterStyle}>Shot: 10</p>
            </div>
        )
    }
}

export default HunterRow;