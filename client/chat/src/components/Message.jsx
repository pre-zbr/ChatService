import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

Message.propTypes = {
  user: PropTypes.string,
  data: PropTypes.string,
  time: PropTypes.string,
  color: PropTypes.string,
};

export default Message;

