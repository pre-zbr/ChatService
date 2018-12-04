import React, { Component } from 'react';
import PropTypes from 'prop-types';

class User extends Component {

  render() {

    const colorStyle = {color: this.props.color};

    return (
        <div style={colorStyle} className="user">{this.props.name}</div>
    );
  }
}

User.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string
};

export default User;
