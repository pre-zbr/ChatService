# ChatService

ChatService is a real time webchat application utilizing 
the websockets protocol for bidirectional communication and
Redis for data persistence.

## Additional Information

Redis needs to be installed and running on the default port.

## Instructions

To start the application, clone the repository and 'npm install' 
all the necessary dependencies specified in the package.json file.

Start up the Redis server.
Run the application server (should connect to the Redis server).
Initialize the frontend application by running "npm start".

The frontend part of this application was created by 'create-react-app' cli tools - 
refer to the scripts part of the package.json file for further instructions.

Detailed instructions below

1) Start the Redis server on the default port 6379.
2) Run "npm install" in the 'ChatService/server' directory.
3) Run "npm start" in the 'ChatService/server' directory (port 4000).
4) Run "npm install" in the 'ChatService/client/chat' directory.
5) Run "npm start" in the 'ChatService/client/chat' directory.
6) The application is accessible via browser on localhost:3000 (webpack dev-server).

## Dependencies

Javascript ES6, Node.js 10+, Socket.io, Redis, React 16+

#### Thank you creators of Node, Redis, Socket.io, React and others 
#### Created by Daedalus1948@github, 2017
