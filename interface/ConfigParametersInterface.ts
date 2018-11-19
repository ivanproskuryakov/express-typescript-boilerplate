/**
 * @interface ConfigParametersInterface
 */
export interface ConfigParametersInterface {
    host: string,
    port: number,
    database: {
        username: string,
        password: string,
    }
}
