import React, { Component } from 'react';

import Widget from './Widget';

class RightBar extends Component {

  render() {
    return (
      <div className="rightbar">
        <Widget action={'change name'} actionHandler={this.props.changeUsername} />
        <Widget action={'change color'} actionHandler={this.props.changeColor} />
      </div>
    );
  }
}

export default RightBar;
