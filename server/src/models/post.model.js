const { Model } = require('objection');
const AuthModel = require('./auth.model.js');

class PostModel extends Model {

    static get idColumn() { return 'userId' };

    static get tableName() { return 'post' };

    static get relationMappings() {
        const User = require('./auth.model.js');

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'post.userId',
                    to: 'users.id'
                }
            }
        };
    }

    $beforeInsert() {
        this.created_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }

    static async getPostById(userId, offset) {
        const data = await PostModel.query()
            .where({userId})
            .withGraphFetched('user')
            .modifyGraph('user', (table) => {
                table.select('name', 'surname', 'profilePic');
            })
            .orderBy('created_at', 'desc')
            .offset(offset)
            .limit(10);
        return data;
    }

    static async getTimeLine(userId,offset) {
        const id = await AuthModel.query()
            .select('id')
            .whereRaw('? = ANY(followings)', [userId])
        const ids = id.map(a => a = a.id);
        ids.push(userId);
        const data = await PostModel.query()
            .findByIds(ids)
            .withGraphFetched('user')
            .modifyGraph('user', (table) => {
                table.select('name', 'surname', 'profilePic');
            })
            .orderBy('created_at','desc')
            .offset(offset)
            .limit(10);
        return data;
    }

    static async addPost(data) {
        return PostModel.query()
            .insert(data)
            .returning('*');
    }

    static async deletePost(id) {
        return PostModel.query()
            .delete()
            .where({ id })
    }

    static async getPostLikesById(id) {
        const data = await PostModel.query()
            .select('likes')
            .where({ id });
        return data[0].likes;
    }

    static async likePostById(like) {
        const data = (await PostModel.query()
            .select('likes')
            .where({ id: like.postId }))[0]
        data.likes.push(like.userId);
        return PostModel.query()
            .update({ likes: data.likes })
            .where({ id: like.postId })
            .returning('likes');
    }

    static async dislikePostById(dislike) {
        var data = (await PostModel.query()
            .select('likes')
            .where({ id: dislike.postId }))[0];
        data = data.likes.filter((like) => like != dislike.userId);
        return PostModel.query()
            .update({ likes: data })
            .where({ id: dislike.postId })
            .returning('likes');

    }

}

module.exports = PostModel;