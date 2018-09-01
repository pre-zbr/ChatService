import React, { Component } from 'react';

class Widget extends Component {

    constructor(props) {
        super(props);
        this.actionHandlerWrapper = this.actionHandlerWrapper.bind(this);
    }

    actionHandlerWrapper(event) {
        event.preventDefault();
        this.activeHandler();
    }

    activeHandler () {
        this.props.connected ? this.props.disconnect() : this.props.connect();
    }
 
    render() {

        return (
            <div className="widget">
                <form >
                    <button onClick={this.actionHandlerWrapper}>
                        {this.props.connected ? 'disconnect' : 'connect'}
                    </button>
                </form>
            </div>
        );
        }
    }

export default Widget;
