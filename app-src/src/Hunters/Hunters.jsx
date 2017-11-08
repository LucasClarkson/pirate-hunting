import React, { Component } from 'react';
import HunterRow from './components/HunterRow';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class Hunters extends Component {
    state = {
        open: false,
        newHunterName: ""
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleHunterNameChange = (e, newName) => {
        this.setState({newHunterName: newName})
    };

    handleSubmit = () => {
        //TODO: save new hunter
        this.handleClose();
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];

        const hunterItemStyle = {
            marginBottom: "8px",
            float: "left",
            width: "calc(100% - 20px)"
        };

        const addButtonStyle = {
            float: "right",
            marginTop: 24,
            marginRight: 20
        }

        return (
            <div style={this.props.style}>
                {
                    (this.props.hunters && this.props.hunters.length > 0) ? 
                    this.props.hunters.map((hunter, index) => {
                      return <HunterRow hunter={hunter} hunts={this.props.hunts[hunter.hunterId]} stands={this.props.stands} style={hunterItemStyle} />
                    }) : <p>You aint got no hunters</p>
                }
                <FloatingActionButton backgroundColor="#2d3a29" style={addButtonStyle} onClick={this.handleOpen}>
                    <ContentAdd />
                </FloatingActionButton>

                <Dialog
                    title="Add New Hunter"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    >
                    <TextField floatingLabelText="Hunter's Name" onChange={this.handleHunterNameChange} />
                </Dialog>
            </div>
        )
    }
}

export default Hunters;