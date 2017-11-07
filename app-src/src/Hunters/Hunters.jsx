import React, { Component } from 'react';
import HunterRow from './components/HunterRow';

class Hunters extends Component {
    render() {

        const hunterItemStyle = {
            marginBottom: "8px",
            float: "left",
            width: "100%"
        };

        return (
            <div style={this.props.style}>
                {
                    (this.props.hunters && this.props.hunters.length > 0) ? 
                    this.props.hunters.map((hunter, index) => {
                      return <HunterRow hunter={hunter} hunts={this.props.hunts[hunter.hunterId]} stands={this.props.stands} style={hunterItemStyle} />
                    }) : <p>You aint got no hunters</p>
                }
            </div>
        )
    }
}

export default Hunters;