const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('')
//open client webserver

io.on('connection', (socket) => {
  var name
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg,name);
    //console.log(name,":",msg)
  });
  //
  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('sysmessage',name+" Disconected", "#f38ba8")
  });
  socket.on('userdata',(uname)=>{
    name=uname
    //get user data
    io.emit('sysmessage',name+" Joined The Lobby","#a6e3a1")
  })
  //connect and disconect messages
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
//open server
