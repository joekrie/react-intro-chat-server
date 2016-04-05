# Intro to ReactJS - Chat App

## Server
The server is written in Express and Socket.IO, and backed by NeDB (a MongoDB-like DBMS that stores data in a plain text file). 

## Client
The client is written in ReactJS. To run it locally, run the following from the client folder:
    
    npm install
    npm start
    
This starts the webpack-dev-server. Note that the server URL is passed in as props. If you decide to run the server locally, be sure to update that prop to point to your own server.
