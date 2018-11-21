import {suite, test} from 'mocha-typescript';
import {BaseControllerTest} from "./BaseControllerTest";
import {HttpHelper} from "../../../helper/HttpHelper";

@suite('Router')
export class GitHubControllerTest extends BaseControllerTest {

    @test('postAction success')
    postAction(done: Function) {
        const url = `${BaseControllerTest.app.config.getServerUrl()}/api/gh-user-repos?a=1`;
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
                console.log(res);
                done();
            });
    }
}
