import {suite, test} from 'mocha-typescript';
import {BaseControllerTestIntegationTest} from "./BaseControllerTest.integation.test";
import {HttpHelper} from "../../../helper/HttpHelper";
import {expect} from "chai";

@suite('Router')
export class GitHubControllerTest extends BaseControllerTestIntegationTest {

    @test('repoDetailsAction success')
    repoDetailsAction(done: Function) {
        const url = `${BaseControllerTestIntegationTest.app.config.getServerUrl()}/gh-repo`;
        let config: {} = {
            url: url,
            method: 'POST',
            data: {
                repoName: 'react',
            }
        };
        HttpHelper
            .request(config)
            .then((res: any) => {
                expect(res.userName).to.be.an.instanceOf('gaearon');
                expect(res.repoName).to.be.an.instanceOf('react');
                expect(res.stars).to.be.an.instanceOf(8);

                done();
            });
    }


    @test('repoCollectionAction success')
    repoCollectionAction(done: Function) {
        const url = `${BaseControllerTestIntegationTest.app.config.getServerUrl()}/gh-user-repos`;
        let config: {} = {
            url: url,
            method: 'GET',
            data: {
                userName: 'gaearon',
            }
        };
        HttpHelper
            .request(config)
            .then((res: any) => {

                expect(res).to.be.an.instanceOf(Array);
                done();
            });
    }
}
