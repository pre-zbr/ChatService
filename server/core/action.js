module.exports = class Action {
    
    constructor(user, type, property, data) {
        this.timestap = new Date();
        this.user = user;
        this.type = type;
        this.property = property;
        this.data = data;
    }
}