import {App} from '../../../app/App';

/**
 * Base class for server route tests
 * starts / shutdown server
 */
export class BaseControllerTest {
    /**
     * @type {App}
     */
    protected static app: App;

    /**
     * @param done
     */
    static before(done: (err?: Error) => void): void {
        BaseControllerTest.app = new App('test');
        BaseControllerTest.app.start(done);
    }

    /**
     * @param done
     */
    static after(done: (err?: Error) => void): void {
        BaseControllerTest.app.stop(done);
    }
}
