const PostService = require('../services/post.service.js');

class PostController {

    static async getPostById(req, res, next) {
        try {
            const { userId } = req.query;
            const data = await PostService.getPostById(userId);
            res.send(data);
        } catch (error) {
            console.log(error);
        }
    }

    static async getTimeLine(req, res, next) {
        try {
            const { userId } = req.query;
            const data = await PostService.getTimeLine(userId);
            res.send(data)
        } catch (error) {
            console.log(error);
        }
    }

    static async addPost(req, res, next) {
        try {
            const { userId, desc, img } = req.body;
            await PostService.addPost({ userId, desc, img });
            console.log(`Added sucessfully`);
            res.send();
        } catch (error) {
            console.log(error);
        }
    }

    static async deletePost(req, res, next) {
        try {
            const { id } = req.params;
            console.log(id);
            await PostService.deletePost(id);
            res.send('deleted');
        } catch (error) {
            console.log(error);
        }
    }


    static async getPostLikesById(req, res, next) {
        try {
            const { postId } = req.query;
            const data = await PostService.getPostLikesById(postId);
            res.send(data)
        } catch (error) {
            console.log(error);
        }
    }

    static async likePostById(req, res, next) {
        try {
            const { postId, userId } = req.body;
            const data = await PostService.likePostById({ postId, userId });
            res.send(data);
        } catch (error) {
            console.log(error);
        }
    }

    static async dislikePostById(req, res, next) {
        try {
            const data = req.query;
            const result = await PostService.dislikePostById(data);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = PostController;