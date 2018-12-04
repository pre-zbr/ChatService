import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

Header.propTypes = {
  disconnect: PropTypes.func,
  connect: PropTypes.func,
  connected: PropTypes.bool
};

export default Header;
