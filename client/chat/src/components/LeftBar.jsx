import React, { Component } from 'react';

import User from './User';

class LeftBar extends Component {

  render() {

    let users = this.props.users.map((user, key) => 
      <User key={key} name={user.name} color={user.color} />
    );

    return (
      <div className="leftbar">
        {users}
      </div>
    );
  }
}

export default LeftBar;
