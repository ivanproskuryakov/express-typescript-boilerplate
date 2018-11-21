import {suite, test} from 'mocha-typescript';
import {BaseControllerTest} from "./BaseControllerTest";
import axios from "axios";

@suite('Router')
export class GitHubControllerTest extends BaseControllerTest {

    @test('postAction success')
    postAction() {
        axios
            .get(`${BaseControllerTest.app.config.getServerUrl()}/api/gh-user-repos`, {
                params: {
                    ID: 12345
                }
            })
            .then((res: any) => {
                console.log(res.data);
            });

        // request(app)
        //     .get('http://0.0.0.0:3000/api/gh-user-repos')
        //     .end(function (err: any, res: any) {
        //         if (err) throw err;
        //
        //         console.log(err);
        //         console.log(res.body);
        //         done();
        //     });
    }
}
