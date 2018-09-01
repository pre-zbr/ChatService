const Action = require('./action.js');

module.exports = class User {

    constructor(clientSocket, name, color, chat) {
        this._onAction(clientSocket);
        this._onDisconnect(clientSocket);
        this.chat = chat; // server Socket handle
        this.socket = clientSocket; // own client Socket through which it receives data
        this.id = clientSocket.id; // socket id = user id
        this.name = name;
        this.color = color;
    }

    provideInfo() {
        return {
            name: this.name,
            color: this.color
        }
    }

    receiveMessage(message) {
        this.socket.emit('action', message);
    }

    dispatchAction(action) {
        this.chat.handleAction(action);
    }

    _onAction(clientSocket) { // - universal handler, frontend dispatches action, backend user adds info and submits to chat class
        clientSocket.on('action', (data)=>{
            // - add backend user info, dont trust front end info
            let action = new Action(this, data.type, data.property, data.data);
            this.dispatchAction(action);
        })
    }

    _onDisconnect(clientSocket) { // - special action gets fired when frontend closes the window
        clientSocket.on('disconnect', ()=>{
            this.dispatchAction({type: 'disconnect', user:this});
        })
    }

}