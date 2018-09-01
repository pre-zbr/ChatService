import React, { Component } from 'react';

class User extends Component {

  render() {

    const colorStyle = {color: this.props.color};

    return (
        <div style={colorStyle} className="user">{this.props.name}</div>
    );
  }
}

export default User;
