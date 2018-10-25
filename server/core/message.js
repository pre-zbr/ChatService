const crypto = require('crypto');

module.exports = class Message {
    
    constructor(userId, color, data) {
        this._uid = crypto.randomBytes(10).toString('hex');
        this.userId = userId;
        this.timestamp = new Date();
        this.color = color;
        this.data = data;
    }
}
