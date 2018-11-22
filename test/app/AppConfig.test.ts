import {suite, test} from 'mocha-typescript';
import {expect} from 'chai';
import {AppConfig} from '../../app/AppConfig';

@suite('AppConfig')
export class AppConfigTest {

    @test('getParameter success')
    getParametersSuccess() {
        const config = new AppConfig('development');
        const params = config.getParameters();

        expect(params).to.be.an.instanceOf(Object);
        expect(params).to.contain.keys([
            'host',
            'port',
            'database'
        ]);
    }
}
