import {suite, test} from 'mocha-typescript';
import {BaseControllerTest} from "./BaseControllerTest";
import {HttpHelper} from "../../../helper/HttpHelper";
import {expect} from "chai";

@suite('Router')
export class GitHubControllerTest extends BaseControllerTest {

    @test('repoDetailsAction success')
    repoDetailsAction(done: Function) {
        const url = `${BaseControllerTest.app.config.getServerUrl()}/api/gh-repo`;
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
                expect(res.id).to.be.equal(17249478);
                done();
            });
    }

    @test('repoCollectionAction success')
    repoCollectionAction(done: Function) {
        const url = `${BaseControllerTest.app.config.getServerUrl()}/api/gh-user-repos`;
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
                console.log(res);

                expect(res).to.be.an.instanceOf(Array);
                done();
            });
    }
}
