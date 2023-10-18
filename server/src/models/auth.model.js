const { Model } = require('objection');

class AuthModel extends Model {

    static get idColumn() { return 'id' };

    static get tableName() { return 'users' };

    static get relationMappings() {
        const Post = require('./post.model');

        return {
            posts: {
                relation: Model.HasManyRelation,
                modelClass: Post,
                join: {
                    from: 'users.id',
                    to: 'post.userId'
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

    static async register(payload) {
        const data = await AuthModel.query()
            .select('*')
            .orWhere({ email: payload.email })
        if (data[0]) {
            if (data[0].email == payload.email) {
                return { error: `Email has already used` };
            } else {
                return { error: `Username has already used` };
            }
        } else {
            return AuthModel.query()
                .insert(payload);
        }
    }

    static async login(email) {
        return AuthModel.query()
            .select('*')
            .where({ email })
    }

    static async findByEmail(username) {
        return AuthModel.query()
            .select('*')
            .where({ username });
    }

    static async findUserById(id) {
        return AuthModel.query()
            .select('*')
            .where({ id });
    }
}

module.exports = AuthModel;