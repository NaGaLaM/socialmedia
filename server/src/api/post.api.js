const router = require('express').Router();
const PostController = require('../controllers/post.controller.js');

router.post('/',PostController.addPost);
router.get('/',PostController.getPostById);
router.get('/timeline',PostController.getTimeLine);
router.delete('/:id',PostController.deletePost);


module.exports = router;