import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Widget from './Widget';

class Footer extends Component {

  render() {
    return (
      <div className="footer">
        <Widget action={'send'} erase={true} actionHandler={this.props.sendMessage} />
      </div>
    );
  }
}

Footer.propTypes = {
  sendMessage: PropTypes.func
};

export default Footer;
