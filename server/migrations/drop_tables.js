const { DB } = require('../src/config/config.js');
const knex = require('knex')(DB.PSQL);

async function down(pg) {
    return pg.schema
    .dropTableIfExists('post')
    .dropTableIfExists('users')
};


async function init() {
    try {
        await down(knex);
        console.log(`Tables deleted successfully!`);
    } catch (error) {
        console.log(error,`Error in deleting tables`);
    }
};


init();