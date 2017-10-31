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
            border: "2px solid #000"
        };

        const nameStyle = {
            margin: 0,
            float: "left"
        };

        return (
            <div style={containerStyle}>
                <p style={nameStyle}>{this.props.hunter.name}</p>
            </div>
        )
    }
}

export default HunterRow;