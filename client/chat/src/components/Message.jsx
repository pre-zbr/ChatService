import React, { Component } from 'react';

class Message extends Component {

  render() {

    const colorStyle = {color: this.props.color};
    
    return (
      <div style={colorStyle} className="message">
          {this.props.time}:
          {this.props.user}:
          {this.props.message}
      </div>
    );
  }
}

export default Message;

