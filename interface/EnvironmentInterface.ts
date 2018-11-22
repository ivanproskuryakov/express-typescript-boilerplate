import {ConfigParametersInterface} from './ConfigParametersInterface';

/**
 * @interface EnvironmentInterface
 */
export interface EnvironmentInterface {
    [key: string]: ConfigParametersInterface;
}
