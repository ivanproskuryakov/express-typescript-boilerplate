import {EnvironmentInterface} from '../interface/EnvironmentInterface'
import {ConfigParametersInterface} from "../interface/ConfigParametersInterface";
import {join} from "path";

/**
 * @class AppConfig
 */
export class AppConfig {
    /**
     * @var EnvironmentInterface
     */
    private readonly environments: EnvironmentInterface;

    constructor() {
        this.environments = require(join(__dirname, './params.json'));
    }

    /**
     * @param {string} env
     * @return ConfigParametersInterface
     */
    public getParameters(env: string = 'dev'): ConfigParametersInterface {
        return this.environments[env];
    };
}