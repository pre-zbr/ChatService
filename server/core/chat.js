const User = require('./user.js');
const Message = require('./message.js');

module.exports = class Chat {

    constructor(serverSocket, dataService) {
        this.serverSocket = serverSocket;
        this.dataService = dataService;
        this.users = {};
        this.messages = [];
    }

    initialize() {
        
        this._onConnection(this.serverSocket);
        
        return new Promise((resolve, reject) => {
            this.dataService.connectToRedisServer()
                .then((status)=>{
                    return this.dataService.loadData();
                })
                .then((data)=>{
                    this.messages = data;
                    resolve(true);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }

    _onConnection(serverSocket) {
        serverSocket.on('connection', (socket) => {
            console.log("new user has connected");
            this.registerUser(new User(socket, '', '', this));
            this.updateStateAll();
        });
    }

    getMessages() {
        return this.messages;
    }

    addMessage(newMessage) {
        this.messages.push(newMessage);
    }

    persistMessage(newMessage) {
        this.dataService.saveData(newMessage)
            .then(() => {
                console.log("message persisted succesfully");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    _getUsers() {
        return this.users;
    }
    
    getUsersInfo() {
        return Object.values(this._getUsers()).map(user=>user.provideInfo());
    }

    registerUser(user) { // subscribe on connect
        this._getUsers()[user.id] = user;
        return true;
    }

    killUser(user) { // unsubscribe
        let users = this._getUsers();
        if (users[user.id]) {
            delete users[user.id]; // call socket disconnect of the user
            return true;
        }
        return false;
    }

    setUser(user, property, datum) { // change name, level, id, whatever...
        let users = this._getUsers();
        if (users[user.id] && users[user.id].hasOwnProperty(property)) {
            users[user.id][property] = datum;
            return true;
        }
        return false;
    }

    updateStateAll() { // send the whole room state again including all history messages, active users
        let usersInfo =this.getUsersInfo();
        let messages = this.getMessages();
        Object.values(this._getUsers()).forEach((user)=>{
            user.receiveMessage({users: usersInfo, messages: messages});
        })
    }

    handleAction(action) {
        switch(action.type) {
            case 'change_name':
                this.setUser(action.user, action.property, action.data);
                break;
            case 'change_color':
                this.setUser(action.user, action.property, action.data);
                break;
            case 'send_message':
                let newMessage = new Message(action.user.name, action.user.color, action.data);
                this.addMessage(newMessage);
                this.persistMessage(newMessage);
                break;
            case 'disconnect':
                this.killUser(action.user);
                break;
            default:
                return null
        }
        this.updateStateAll();
    }
} 