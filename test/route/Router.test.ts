import {suite, test} from 'mocha-typescript';
import {Router} from '../../route/Router';
import {expect} from 'chai';

@suite('Router')
export class RouterTest {

  @test('init success')
  initSuccess() {
    const r = new Router();
    const routes = r.buildRoutes();

    expect(routes.stack[0].route.path).to.be.equal('/gh-repo');
    expect(routes.stack[1].route.path).to.be.equal('/gh-user-repos');
  }
}
