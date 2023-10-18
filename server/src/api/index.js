const api = require('express')();
const media = require('./upload.js');
const auth = require('./auth.api.js');
const post = require('./post.api.js');
const likes = require('./likes.api.js')
const users = require('./users.api.js')

api.use('/upload', media);
api.use('/auth', auth);
api.use('/posts', post)
api.use('/likes', likes);
api.use('/users',users)


module.exports = api;