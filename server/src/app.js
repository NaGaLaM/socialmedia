// Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path')

// Local Modules
const config = require('./config/config.js');
const DBInit = require('./storage/psql.js');
const api = require('./api/index.js');

class App {

    constructor() {
        this.app = express();
        this.app.use('/images', express.static(path.join(__dirname, '..','public','images')));
        this.app.use('/uploads', express.static(path.join(__dirname, '..','uploads')));
    }

    async _init() {
        await this._initStorage();
        this._setCors();
        this._setReqLogger();
        this._setReqParser();
        this._initApi();
    }

    _setReqParser() {
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));
    }

    _setCors() {
        this.app.use(cors({
            origin: config.CLIENT_HOST || '*',
            methods: ['GET', 'PUT', 'PATCH', 'DELETE', 'POST'],
            allowedHeaders: ['Authorization', 'Content-Type', 'Origin'],
            credentials: true,
            optionsSuccessStatus: 200,
            maxAge: -1
        }));
    }

    _setReqLogger() {
        if(config.REQ_LOGGER){
            this.app.use(morgan('dev'));
        }
    }

    async _initStorage() {
        await DBInit.initPSQL();
    }

    _initApi() {
        this.app.use('/api', api);
    }

}

module.exports = new App();