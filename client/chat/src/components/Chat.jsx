import React, { Component } from 'react';

import Message from './Message';

class Chat extends Component {

  render() {

    let messages = this.props.messages.map((msg, idx) => 
      <Message key={msg._uid} time={msg.timestamp} color={msg.color} user={msg.userId} message={msg.data}/>
    );

    return (
      <div className="chat">
        {messages}
      </div>
    );
  }
}

export default Chat;
