// Node Modules
const http = require('http');
// const socketIo = require('socket.io');
// const fs = require('fs');
// const path = require('path');

// Local modules
const config = require('../config/config.js');
const App = require('../app.js');

// https configs
// const options = {
//     key: fs.readFileSync(path.join(__dirname, '..', '..', 'server.key')),
//     cert: fs.readFileSync(path.join(__dirname, '..', '..', 'server.cert'))
// };

const server = http.createServer(App.app);
App._init();

const PORT = config.PORT || 4005;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});