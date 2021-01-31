const { stringify } = require('querystring');

const server = require('http').createServer()
const io = require('socket.io')(server, {

    cors: {
        origin: "*",
    },
    allowEIO3: true
});


io.on('connection', socket => {
    //roomId = socket.handshake.query.roomId
    console.log(`Client ${socket.id} connected `);
    //socket.join(roomId)


    // Send message to only a particular user
    socket.on('newChatMessage', (message) => {
        //console.log(message);
        //roomId = message.roomId
        content = message.content
        //console.log(typeof(content));
        
        socket.broadcast.emit('newChatMessage',message);
        //socket.emit('newChatMessage',message);
       // socket.in(roomId).emit('newChatMessage', message);

        console.log(message);
        
    })

    //Leave the room if the user closes the socket
    socket.on('disconnect', () => {
        console.log(`Client ${socket.id} disconnected` );
        //socket.leave(roomId)
    })
});

server.listen(4000, '0.0.0.0')