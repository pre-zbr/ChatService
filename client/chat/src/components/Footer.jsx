import React, { Component } from 'react';

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

export default Footer;
