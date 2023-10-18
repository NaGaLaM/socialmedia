const knex = require('knex')
const { DB } = require('../config/config.js');
const { Model } = require('objection');

class DBInit {
    static async initPSQL() {
        try {
            Model.knex(knex(DB.PSQL));
            const db = knex(DB.PSQL);
            await db.raw('select 1');
            console.log(`PSQL connected successfully ...`);
        } catch (error) {
            console.log(error, 'Error in connection PSQL');
        }

    }

}

module.exports = DBInit;
