import {App} from '../../../app/App';

/**
 * Base class for server route tests
 * starts / shutdown server
 */
export class BaseControllerTestIntegationTest {

    /**
     * @type {App}
     */
    protected static app: App;

    static before(done: (err?: Error) => void): void {
        BaseControllerTestIntegationTest.app = new App('test');
        BaseControllerTestIntegationTest.app.start(done);
    }

    static after(done: (err?: Error) => void): void {
        BaseControllerTestIntegationTest.app.stop(done);
    }
}
