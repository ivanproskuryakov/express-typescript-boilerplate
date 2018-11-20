import {DBClient} from './database';

/**
 * @var DatabaseAdapter
 */
export class DatabaseAdapter {

    /**
     * @param {string} username
     * @param {string} password
     * @return DBClient
     */
    public connect(username: string, password: string): DBClient {
        return new DBClient(
            username,
            password
        )
    }
}
