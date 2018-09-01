import React, { Component } from 'react';
import io from 'socket.io-client';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';


class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.addEventHandler = this.addEventHandler.bind(this);

    this.state = {
      socket: io.connect('http://127.0.0.1:4000'), // should this be in state?
      connected: true,
      users: [],
      messages: []
    }

  }

  componentDidMount() {
    this.addEventHandlers(this.state.socket);
  }

  connect() {
    this.state.socket.connect('http://127.0.0.1:4000'); // synchronous call
  }

  disconnect() {
    this.state.socket.disconnect(); // can I call state object's function, isn't it a react-anti-pattern?
  }

  addEventHandlers(socket) {
    socket.on('action', (serverData) => {
      this.setState({users: serverData.users, messages: serverData.messages});
    })

    socket.on('connect', () => {
      this.setState({ connected: true});
    })

    socket.on('disconnect', () => {
      this.setState({ connected: false, users:[], messages:[]});
    })
  }

  changeColor(newColor) {
    this.state.socket.emit('action', {type:'change_color', property:'color', data: newColor});
  }

  changeUsername(newUsername) {
    this.state.socket.emit('action', {type:'change_name', property:'name', data: newUsername});
  }

  sendMessage(newMessage) {
    this.state.socket.emit('action', {type:'send_message', data: newMessage});
  }

  render() {
      return (
        <div className="main">
          <Header disconnect={this.disconnect} connect={this.connect} connected={this.state.connected}/>
          <Content users={this.state.users} messages={this.state.messages} 
            changeUsername={this.changeUsername} changeColor={this.changeColor} />
          <Footer sendMessage={this.sendMessage} />
        </div>
      );
  }
}

export default App;
