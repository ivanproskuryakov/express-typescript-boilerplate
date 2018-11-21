import {suite, test} from 'mocha-typescript';
import {BaseControllerTest} from "./BaseControllerTest";
import {HttpHelper} from "../../../helper/HttpHelper";

@suite('Router')
export class GitHubControllerTest extends BaseControllerTest {

    @test('postAction success')
    postAction(done: Function) {
        HttpHelper
            .request(
                `http://0.0.0.0:2000/api/gh-user-repos`,
                {method: 'GET'}
            )
            .then((res: any) => {
                console.log(res);
                done();
            });
    }
}
