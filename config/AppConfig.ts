import {EnvironmentInterface} from '../interface/EnvironmentInterface'
import {ConfigParametersInterface} from "../interface/ConfigParametersInterface";

/**
 * @class AppConfig
 */
export class AppConfig {
    /**
     * @var EnvironmentInterface
     */
    private readonly environments: EnvironmentInterface = {
        dev: {
            host: '0.0.0.0',
            port: 3000,
            database: {
                username: '',
                password: '',
            }
        },
        staging: {
            host: '0.0.0.0',
            port: 4000,
            database: {
                username: '',
                password: '',
            }
        },
        production: {
            host: '0.0.0.0',
            port: 5000,
            database: {
                username: '',
                password: '',
            }
        }
    };

    /**
     * @param {string} env
     * @return ConfigParametersInterface
     */
    public getParameters(env: string = 'dev'): ConfigParametersInterface {
        return this.environments[env];
    };
}