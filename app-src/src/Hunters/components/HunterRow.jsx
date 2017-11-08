import React, { Component } from 'react';
import HunterInnerRow from './HuntInnerRow';

class HunterRow extends Component {

    constructor(props) {
        super(props);
        this.state = { isExpanded: false };
      }

    handleClick = () => {
        this.setState({isExpanded: !this.state.isExpanded});
    }
    
    render() {
        const containerStyle = {
            ...this.props.style,
            minHeight: "48px",
            lineHeight: "48px",
            background: "#bbb89e",
            padding: "8px",
            borderRadius: "16px",
            border: "2px solid #000",
            fontSize: "1.4em"
        };

        const collapsedRowStyle = {
            width: "100%",
            float: "left"
        }

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

        const expandCollapseStyle = {
            float: "right",
            cursor: "pointer"
        }

        const huntsContainerStyle = {
            float: "left",
            width: "100%"
        }

        const HunterInnerRowStyle = {
            marginBottom: "4px"
        }

        const hasHunts = this.props.hunts && this.props.hunts.length > 0;

        const shotCount = hasHunts ? this.props.hunts.map(hunt => hunt.shot.length > 0 ? hunt.shot.map(s => s.count).reduce((sum, value) => sum + value) : []).reduce((sum, value) => sum + value) : 0;
        const observedCount = hasHunts ? this.props.hunts.map(hunt => hunt.observed.length > 0 ? hunt.observed.map(o => o.count).reduce((sum, value) => sum + value) : []).reduce((sum, value) => sum + value) : 0;

        return (
            <div style={containerStyle}>
                <div style={collapsedRowStyle}>
                    <p style={nameStyle}>{this.props.hunter.name}</p>
                    <img onClick={this.handleClick} style={expandCollapseStyle} src={this.state.isExpanded ? "/images/collapse_black.png" : "/images/expand_black.png"} />
                    <p style={counterStyle}>Shot: {shotCount}</p>
                    <p style={counterStyle}>Observed: {observedCount}</p>
                    <p style={counterStyle}>Hunts: {this.props.hunts ? this.props.hunts.length : 0}</p>
                </div>
                {this.state.isExpanded &&
                <div style={huntsContainerStyle}>
                    {
                        (this.props.hunts && this.props.hunts.length > 0) ? 
                        this.props.hunts.map((hunt, index) => {
                        return <HunterInnerRow hunt={hunt} stand={this.props.stands[hunt.standId]} style={HunterInnerRowStyle} />
                        }) : <p>You aint got no hunts</p>
                    }
                </div>}
            </div>
        )
    }
}

export default HunterRow;