const PostModel = require('../models/post.model.js');

class PostService {

    static async getPostById(id) {
        return PostModel.getPostById(id);
    }

    static async getTimeLine (id) {
        return PostModel.getTimeLine (id);
    }

    static async addPost(data) {
        return PostModel.addPost(data);
    }

    static async deletePost(id) {
        return PostModel.deletePost(id);
    }

    static async getPostLikesById(id) {
        const likes = await PostModel.getPostLikesById(id);
        return likes;
    }

    static async likePostById(like) {
        const liked = await PostModel.likePostById(like);
        return liked;
    }

    static async dislikePostById(dislike) {
        return PostModel.dislikePostById(dislike);
    }

}

module.exports = PostService;