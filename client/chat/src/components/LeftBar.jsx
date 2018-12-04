import React, { Component } from 'react';
import PropTypes from 'prop-types';

import User from './User';

class LeftBar extends Component {

  render() {
    let users = this.props.users.map((user, key) => 
      <User key={Math.random().toString(36).substr(5)} name={user.name} color={user.color} />
    );

    return (
      <div className="leftbar">
        {users}
      </div>
    );
  }
}

LeftBar.propTypes = {
  users: PropTypes.array,
};

export default LeftBar;
