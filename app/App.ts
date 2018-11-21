import express from 'express';
import bodyParser from 'body-parser';

import {Router} from '../route/Router';
import {AppConfig} from './AppConfig';
import {DatabaseAdapter} from '../storage/DatabaseAdapter';
import * as http from "http";

export class App {
    /**
     * @var AppConfig
     */
    public readonly config: AppConfig;
    /**
     * @var http.Server
     */
    public static server: http.Server;
    /**
     * @var express.Application
     */
    public readonly express: express.Application;

    /**
     * @param {string} env
     */
    constructor(env: string) {
        this.express = express();
        this.config = new AppConfig(env);
    }

    /**
     * @param {Function} cb
     */
    public start(cb?: Function) {
        this.initAPIRouter();
        this.initMiddleware();

        this.listen(cb);
    }

    /**
     * @param {Function} cb
     */
    public stop(cb?: Function) {
        App.server.close(cb);
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


    /**
     * @param {Function} cb
     */
    private listen(cb?: Function) {
        const params = this.config.getParameters();

        App.server = this.express.listen(params.port, params.host, () => {
            console.log(`App listening on http://${params.host}:${params.port}`);

            this.initDatabaseConnection();

            if (cb) {
                cb();
            }
        });
    }
}
