const redis = require('redis');
const express = require('express');
const expressApp = express();
const httpServer = require('http').Server(expressApp);
const io = require('socket.io')(httpServer);
const Chat = require('./core/chat.js');
const RedisService = require('./core/redisService.js');


expressApp.use(express.static('public')); // serve index.html

const chatApp = new Chat(io, new RedisService(redis));

chatApp.initialize()
    .then((status) => {
        console.log("chat app initialized");
        // chat app initialized, injected dataService succesfully fetched message history
        httpServer.listen(4000, ()=>{
            // server bound to port 4000 and listening
            console.log("serving on 4000");
        });
    })
    .catch((error)=>{
        return console.log(error);
    })