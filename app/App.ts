import express from 'express';
import bodyParser from 'body-parser';

import {Router} from '../route/Router';
import {AppConfig} from './AppConfig';
import {DatabaseAdapter} from '../storage/DatabaseAdapter';

export class App {
    /**
     * @var express.Application
     */
    private readonly express: express.Application;
    /**
     * @var AppConfig
     */
    private readonly config: AppConfig;

    constructor() {
        this.express = express();
        this.config = new AppConfig();
    }

    public run() {
        this.initAPIRouter();
        this.initDatabaseConnection();
        this.initMiddleware();

        this.listen();
    }

    private initAPIRouter() {
        this.express.use('/api', Router.init());
    }

    private initDatabaseConnection() {
        const params = this.config.getParameters();
        const adapter = new DatabaseAdapter();

        this.express.set('database', adapter.connect(
            params.database.username,
            params.database.password
        ));
    }

    private initMiddleware() {
        this.express.use(bodyParser());
    }

    private listen() {
        const params = this.config.getParameters();

        this.express.listen(params.port, params.host, () => {
            console.log(`App listening on http://${params.host}:${params.port}`);
        });
    }
}
