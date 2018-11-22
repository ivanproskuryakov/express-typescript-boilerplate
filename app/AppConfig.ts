import {EnvironmentInterface} from '../interface/EnvironmentInterface';
import {ConfigParametersInterface} from '../interface/ConfigParametersInterface';
import {join} from 'path';

/**
 * @class AppConfig
 */
export class AppConfig {
    /**
     * @type {EnvironmentInterface}
     */
    private readonly parameters: ConfigParametersInterface;
    /**
     * @type {string}
     */
    public readonly env: string;

    /**
     * @param {string} env
     */
    constructor(env: string) {
        const environments: EnvironmentInterface = require(join(
            __dirname,
            './params.json',
        ));

        this.env = env;
        this.parameters = environments[this.env];
    }

    /**
     * @return ConfigParametersInterface
     */
    public getParameters(): ConfigParametersInterface {
        return this.parameters;
    }

    /**
     * @return {string}
     */
    public getServerUrl(): string {
        return `http://${this.parameters.host}:${this.parameters.port}`;
    }
}
