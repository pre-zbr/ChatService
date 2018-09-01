import React, { Component } from 'react';

import ButtonWidget from './ButtonWidget';

class Header extends Component {

  render() {
    return (
      <div className="header">
        <ButtonWidget connected={this.props.connected} disconnect={this.props.disconnect} connect={this.props.connect}/>
      </div>
    );
  }
}

export default Header;
