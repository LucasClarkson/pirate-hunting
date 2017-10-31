import React, { Component } from 'react';
import HunterRow from './components/HunterRow';

class Hunters extends Component {
    render() {

        const hunterItemStyle = {
            marginBottom: "8px"
        };

        return (
            <div style={this.props.style}>
                {
                    (this.props.hunters && this.props.hunters.length > 0) ? 
                    this.props.hunters.map((hunter, index) => {
                      return <HunterRow hunter={hunter} style={hunterItemStyle} />
                    }) : <p>You aint got no hunters</p>
                }
            </div>
        )
    }
}

export default Hunters;