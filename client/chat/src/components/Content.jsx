import React, { Component } from 'react';

import LeftBar from './LeftBar';
import Chat from './Chat';
import RightBar from './RightBar';



class Content extends Component {

  
  render() {
    return (
      <div className="content">
        <LeftBar users={this.props.users} />
        <Chat messages={this.props.messages} />
        <RightBar changeUsername={this.props.changeUsername} changeColor={this.props.changeColor} />
      </div>
    );
  }
}

export default Content;
