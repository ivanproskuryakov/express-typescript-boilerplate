import {suite, test} from 'mocha-typescript';
import {Router} from '../../route/Router';
import {expect} from 'chai';

@suite('Router')
export class RouterTest {

    @test('init success')
    initSuccess() {
        const router = Router.init();

        expect(router.stack[0].route.path).to.be.equal('/gh-repo');
        expect(router.stack[1].route.path).to.be.equal('/gh-user-repos');
    }
}
