module.exports = class Message {
    
    constructor(userId, color, data) {
        this.userId = userId;
        this.timestamp = new Date();
        this.color = color;
        this.data = data;
    }
}