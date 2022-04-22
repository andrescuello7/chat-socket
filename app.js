const SocketIO = require('socket.io')
const express = require('express')
const path = require('path')
const app = express()

//settings
app.set('port', process.env.PORT || 4000)

//middleware
app.use(express.static(path.join(__dirname, 'public')))

//server function
const server = app.listen(app.get('port'), () => {
    console.log('funcion of server in port', app.get('port'))
})

//server socket
const io = SocketIO(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

//socket function
io.on('connection', (socket) => {
    console.log('connection in server', socket.id)
    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data)
    })

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data)
    })
})