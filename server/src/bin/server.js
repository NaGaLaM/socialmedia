// Node Modules
const http = require('http');
const socketIo = require('socket.io');
// const fs = require('fs');
// const path = require('path');
// const cluster = require('cluster');
// Local modules
const config = require('../config/config.js');
const App = require('../app.js');
const AuthService = require('../services/auth.service.js');
// https configs
// const options = {
//     key: fs.readFileSync(path.join(__dirname, '..', '..', 'server.key')),
//     cert: fs.readFileSync(path.join(__dirname, '..', '..', 'server.cert'))
// };
const server = http.createServer(App.app);


const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
    }
});
const users = new Set();

io.on('connection', (socket) => {

    socket.on('online', async (id) => {
        socket.userId = id;
        users.add(id);
        io.emit('online', Array.from(users));
    })

    socket.on('disconnect', () => {
        users.delete(socket.userId);
        io.emit('online', Array.from(users));
    })

})


App._init();


const PORT = config.PORT || 4005;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});