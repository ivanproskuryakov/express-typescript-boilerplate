import {DBClient} from '../storage/database';

/**
 * @var DatabaseAdapter
 */
export class DatabaseAdapter {
    /**
     * @var {DBClient}
     */
    private connection: DBClient;

    /**
     * @param {string} username
     * @param {string} password
     */
    public connect(username: string, password: string) {
        this.connection = new DBClient(
            username,
            password
        )
    }

    /**
     * @return DBClient
     */
    public getConnection(): DBClient {
        return this.connection;
    }
}
