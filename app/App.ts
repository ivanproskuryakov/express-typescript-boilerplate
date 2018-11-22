import express from 'express';
import * as http from "http";
import bodyParser from 'body-parser';

import {Router} from '../route/Router';
import {AppConfig} from './AppConfig';
import {DatabaseAdapter} from '../storage/DatabaseAdapter';

export class App {
    /**
     * @type AppConfig
     */
    public readonly config: AppConfig;
    /**
     * @type http.Server
     */
    public static server: http.Server;
    /**
     * @type express.Application
     */
    public readonly express: express.Application;

    /**
     * @param {string} env
     */
    constructor(env: string) {
        console.log(env);

        this.express = express();
        this.config = new AppConfig(env);
    }

    /**
     * @param {Function} cb
     */
    public start(cb?: Function) {
        this.initMiddleware();
        this.initRouter();

        this.listen(cb);
    }

    /**
     * @param {Function} cb
     */
    public stop(cb?: Function) {
        App.server.close(cb);
    }

    private initMiddleware() {
        this.express.use(bodyParser());
    }

    private initRouter() {
        this.express.use(Router.init());
    }

    private initDatabaseConnection() {
        const params = this.config.getParameters();
        const adapter = new DatabaseAdapter();

        this.express.set('database', adapter.connect(
            params.database.username,
            params.database.password
        ));
    }

    /**
     * @param {Function} cb
     */
    private listen(cb?: Function) {
        const params = this.config.getParameters();

        App.server = this.express.listen(params.port, params.host, () => {
            console.log(`App[${this.config.env}] listening on http://${params.host}:${params.port}`);

            this.initDatabaseConnection();

            if (cb) {
                cb();
            }
        });
    }
}
