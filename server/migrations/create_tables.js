const { DB } = require('../src/config/config.js');
const knex = require('knex')(DB.PSQL);

async function up(pg) {
    return pg.schema
        .createTable('users', (table) => {
            table.increments('id').notNullable().primary();
            table.string('name').notNullable();
            table.string('surname').notNullable();
            table.string('password').notNullable();
            table.string('email').notNullable().unique();
            table.string('activationLink').notNullable();
            table.boolean('isActivated').defaultTo(false);
            table.string('profilePic').notNullable().defaultTo('noAvatar.png');
            table.string('coverPic').notNullable().defaultTo('noCover.png');
            table.specificType('followers', 'integer[]').defaultTo('{}');
            table.specificType('followings', 'integer[]').defaultTo('{}');
            table.string('role').defaultTo('user');
            table.string('desc');
            table.string('city');
            table.string('from');
            table.specificType('relationship', 'text[]').defaultTo('{}');
            table.dateTime('created_at');
            table.dateTime('updated_at');
        })
        .createTable('post', (table) => {
            table.increments('id').primary();
            table.integer('userId').references('id').inTable('users');
            table.string('desc');
            table.string('img');
            table.specificType('likes', 'integer[]').defaultTo('{}');
            table.dateTime('created_at');
            table.dateTime('updated_at');
        })
}

async function init() {
    try {
        await up(knex);
        console.log(`Tables created successfully!`);
    } catch (error) {
        console.log(error, `error in creating tables`);
    }
}

init();