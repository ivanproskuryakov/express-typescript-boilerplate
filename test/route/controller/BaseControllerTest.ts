import {App} from '../../../app/App';

/**
 * Base class for server route tests
 * starts / shutdown server
 */
export class BaseControllerTest {

    /**
     * @var {App}
     */
    protected static app: App;

    static before(done: (err?: Error) => void): void {
        BaseControllerTest.app = new App('test');
        BaseControllerTest.app.start(done);
    }

    static after(done: (err?: Error) => void): void {
        BaseControllerTest.app.stop(done);
    }
}
