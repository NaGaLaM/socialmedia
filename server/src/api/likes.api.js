const router = require('express').Router();
const PostController = require('../controllers/post.controller.js');

let a = 0

router.get('/',PostController.getPostLikesById);
router.post('/',PostController.likePostById);
router.delete('/',PostController.dislikePostById);

module.exports = router;