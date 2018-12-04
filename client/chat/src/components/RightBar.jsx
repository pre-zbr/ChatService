import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

RightBar.propTypes = {
  changeUsername: PropTypes.func,
  changeColor: PropTypes.func
};

export default RightBar;
