module.exports = class RedisService {

    constructor(redis) {
        this.redis = redis;
        this.connection = null;
    }

    connectToRedisServer() {
        return new Promise((resolve, reject) => {
            this.connection = this.redis.createClient()
                .on('connect', () => {
                    console.log('Redis client connected');
                    resolve(true);
                })
                .on('error', (err) => {
                    reject(err);
                });   
        })
    }

    //// NOT TESTED 
    loadData() { // on startup
        return new Promise((resolve, reject) => {
            this.connection.lrange("chat-history", 0 , -1, (err, data)=>{
                if (err) {
                    reject(err);
                }
                if (data==null) { // if there is no data yet
                    resolve([]);
                }
                let deserializedData = data.map((message)=>JSON.parse(message));
                resolve(deserializedData);
            });
        })
    }

    //// NOT TESTED 
    // use Redis linked-list data structure for easy retrieval
    saveData(chatMessage) { // on every message, also inits chat-history linked-list
        return new Promise((resolve, reject) => {
            this.connection.rpush("chat-history", JSON.stringify(chatMessage), (err, res)=>{
                if (err) {
                    console.log(err);
                    reject(err);
                }
                console.log(res);
                resolve(res);
            });
        })
    }
}


