import express from 'express';
import bodyParser from 'body-parser';

import {AppConfig} from '../config/AppConfig';
import {DatabaseAdapter} from './DatabaseAdapter';

export class App {
    /**
     * @var express.Application
     */
    private readonly express: express.Application;
    /**
     * @var AppConfig
     */
    private readonly config: AppConfig;
    /**
     * @var DatabaseAdapter
     */
    public database: DatabaseAdapter;

    constructor() {
        this.express = express();
        this.config = new AppConfig();
        this.database = new DatabaseAdapter();
    }

    public run() {
        const params = this.config.getParameters();

        this.database.connect(
            params.database.username,
            params.database.password
        );
        this.express.use(bodyParser());

        this.express.listen(params.port, params.host, () => {
            console.log(`App listening on http://${params.host}:${params.port}`);
        });
    }
}
