const redis = require('redis');
const express = require('express');
const expressApp = express();
const httpServer = require('http').Server(expressApp);
const io = require('socket.io')(httpServer);
const Chat = require('./core/chat.js');
const RedisService = require('./core/redisService.js');


const chatApp = new Chat(io, new RedisService(redis));

chatApp.initialize()
    .then((status) => { // chat app initialized, injected dataService succesfully fetched message history
        console.log("chat app initialized");
        httpServer.listen(3999, ()=>{
            // server bound to port 3999 and listening
            console.log("serving on 3999");
        });
    })
    .catch((error)=>{
        return console.log(error);
    })
