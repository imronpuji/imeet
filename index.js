const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors')
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true
  }});


app.use(cors())
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/o', (req, res) => {
  res.sendFile(__dirname + '/output.html');
});

app.get('/a', (req, res) => {
  res.sendFile(__dirname + '/answer.html');
});

io.on('connection', (socket) => {
  socket.on('offer', (stream) => {
    console.log(stream)
  	io.emit('message', stream)
  })

  socket.on('answer', (stream) => {
    io.emit('call-made', stream)
  })

  socket.on('news-ice-candidate', (stream) => {
    io.emit('candidates', stream)
  })

  socket.on('new-ice-candidate', (stream) => {
    io.emit('candidate', stream)
  })


});

server.listen(process.env.PORT || 3000 , () => {
  console.log('listening on *:3000');
});

