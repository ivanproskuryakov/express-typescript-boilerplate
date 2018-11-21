import {suite, test} from 'mocha-typescript';
import {BaseControllerTest} from "./BaseControllerTest";
import {HttpHelper} from "../../../helper/HttpHelper";
import {expect} from "chai";

@suite('Router')
export class GitHubControllerTest extends BaseControllerTest {

    @test('repoDetailsAction success')
    repoDetailsAction(done: Function) {
        const url = `${BaseControllerTest.app.config.getServerUrl()}/api/gh-user-repo-details`;
        let config: {} = {
            url: url,
            method: 'POST',
            data: {
                username: 'ivanproskuryakov',
                repo: 'Aisel',
            }
        };
        HttpHelper
            .request(config)
            .then((res: any) => {
                expect(res.id).to.be.equal(17249478);
                done();
            });
    }

    @test('repoDetailsAction success')
    repoCollectionAction(done: Function) {
        const url = `${BaseControllerTest.app.config.getServerUrl()}/api/gh-user-repo-collection`;
        let config: {} = {
            url: url,
            method: 'GET',
            data: {
                username: 'gaearon',
            }
        };
        HttpHelper
            .request(config)
            .then((res: any) => {
                console.log(res);

                expect(res).to.be.an.instanceOf(Array);
                done();
            });
    }
}
