import {suite, test} from 'mocha-typescript';
import {expect} from 'chai';
import {AppConfig} from "../../app/AppConfig";

@suite('AppConfig')
export class AppConfigTest {

    @test('getParameter success')
    getParametersSuccess() {
        let config = new AppConfig();
        let params = config.getParameters('dev');

        expect(params).to.be.an.instanceOf(Object);
        expect(params).to.contain.keys([
            'host',
            'port',
            'database'
        ]);
    }
}
