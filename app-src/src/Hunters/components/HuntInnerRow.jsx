import React, { Component } from 'react';

class HuntInnerRow extends Component {
    
    render() {
        const containerStyle = {
            ...this.props.style,
            display: "flex",
            minHeight: "24px",
            lineHeight: "24px",
            background: "#41533b",
            color: "#FFFFFF",
            padding: "8px",
            borderRadius: "12px",
            border: "2px solid #000",
            fontSize: ".8em"
        };

        const outerInfoStyle = {
            margin: 0
        };

        const middleInfoStyle = {
            margin: "0 auto"
        };

        const observed = this.props.hunt.observed.length > 0 ? this.props.hunt.observed.map((o) => o.count + " " + o.animalId).join(', ') : "nothing";
        const shot = this.props.hunt.shot.length > 0 ? this.props.hunt.shot.map((o) => o.count + " " + o.animalId).join(', ') : "nothing";

        return (
            <div style={containerStyle}>
                <p style={outerInfoStyle}>{this.props.hunt.date} {this.props.hunt.timeOfDay == "morning" ? "am" : "pm"} - {this.props.stand.name}</p>
                <p style={middleInfoStyle}>Observed: {observed}</p>
                <p style={outerInfoStyle}>Shot: {shot}</p>
            </div>
        )
    }
}

export default HuntInnerRow;