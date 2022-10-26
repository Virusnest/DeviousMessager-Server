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

io.on('connection', (socket) => {
  var name
  console.log('a user connected');
  socket.on('userdata',(uname)=>{
    name=uname
    io.emit('sysmessage',name+" Joined The Lobby","green")
  })
  //Get user data

  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg,name);
    //console.log(name,":",msg)
  });
  //manage chat messages
  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('sysmessage',name+" Disconected","red")
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
