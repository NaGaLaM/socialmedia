require('dotenv').config();
module.exports = {
    CLIENT_HOST: process.env.CLIENT_HOST,
    PORT: process.env.PORT,
    DB: {
        PSQL: {
            client: 'pg',
            connection: {
                host: process.env.DB_HOST,
                database: process.env.DB_DATABASE,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD
            }
        }
    },
    REQ_LOGGER:1
}