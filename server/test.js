const assert = require('assert');

const Chat = require('./core/chat.js');
const User = require('./core/user.js');
const Message = require('./core/message.js');


class MockRedisService {
    loadData () {
        return new Promise((resolve, reject)=>{resolve([])}); // fake the redis-server call and supply empty []
    }

    saveData () {
        return null;
    }
}

class MockClientSocket {
    constructor(id) {
        this.id = id;
    }
    emit(event, data) {
        return {event, data};
    }

    on() {
        return null;
    }
}

class MockServerSocket {
    constructor(id) {
        this.id = id;
    }
    emit() {
        return null;
    }
    on() {
        return null;
    }
}


describe('User', function() {

    const mockServerSocket1 = new MockServerSocket();
    const mockClientSocket1 = new MockClientSocket('testSocketID');
    const testUser = new User(mockClientSocket1, 'mockName', 'mockColor', mockServerSocket1);

    it('User name should be mockName', function() {
        assert.equal(testUser.name, 'mockName');
    });

    it('User color should be mockColor', function() {
        assert.equal(testUser.color, 'mockColor');
    });

    it('User ID should match injected socketClient ID', function() {
        assert.equal(testUser.id, mockClientSocket1.id);
    });

    it('User provideInfo() should return object with user name and color', function() {
        assert.deepEqual(testUser.provideInfo(), {name:testUser.name, color:testUser.color});
    });

});

describe('Chat', function() {

    const mockRedisService = new MockRedisService();
    const mockServerSocket1 = new MockServerSocket();
    const mockClientSocket1 = new MockClientSocket('testSocketID');
    const testUser = new User(mockClientSocket1, 'mockName', 'mockColor', mockServerSocket1);
    const testChat = new Chat(mockServerSocket1, mockRedisService);
    const testMessage = new Message(testUser.id, new Date(), 'red', "testMessage");

    it('Chat _getUsers() returns user data', function() {
        assert.deepEqual(testChat._getUsers(), testChat.users);
    });

    it('Chat _getUsersInfo() returns an array of filtered users', function() {
        testChat.registerUser(testUser); // add user
        assert.deepEqual(testChat.getUsersInfo(), [{name:testUser.name, color:testUser.color}]);
    });

    it('Chat registerUser(user) updates chat.users state with user', function() {
        testChat.registerUser(testUser); // add user
        assert.deepEqual(testChat._getUsers(testUser), {[testUser.id]: testUser});
    });

    it('Chat killUser(user) removes user from chat.users', function() {
        testChat.registerUser(testUser); // add user
        testChat.killUser(testUser); // remove the user
        assert.deepEqual({}, testChat._getUsers());
    });

    it('Chat getMessages() returns messages', function() {
        assert.deepEqual(testChat.getMessages(), testChat.messages);
    });

    it('Chat addMessage(message) updates chat.messages state with message', function() {
        testChat.addMessage(testMessage); // add message
        assert.deepEqual([testMessage], testChat.messages);
    });

});


