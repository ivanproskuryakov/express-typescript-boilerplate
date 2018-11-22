import {suite, test} from 'mocha-typescript';
import {BaseControllerTest} from "./BaseControllerTest.test";
import {HttpHelper} from "../../../helper/HttpHelper";
import {expect} from 'chai';
import {join} from "path";

const nock = require('nock');

@suite('Router')
export class GitHubControllerTest extends BaseControllerTest {

    @test('repoDetailsAction success')
    repoDetailsAction(done: Function) {
        nock.cleanAll();

        const githubNock = nock('https://api.github.com');
        const config: {} = {
            url: `${BaseControllerTest.app.config.getServerUrl()}/gh-repo`,
            method: 'POST',
            data: {
                repoName: 'react',
            }
        };


        githubNock
            .get('/repos/gaearon/react')
            .reply(200, this.getContents('gaearon.react.json'))
            .persist();


        HttpHelper
            .request(config)
            .then((res: any) => {
                console.log(res);

                expect(res.userName).to.be.equal('gaearon');
                expect(res.repoName).to.be.equal('react');
                expect(res.stars).to.be.equal(8);

                done();
            });
    }


    @test('repoCollectionAction success')
    repoCollectionAction(done: Function) {
        nock.cleanAll();

        const config: {} = {
            url: `${BaseControllerTest.app.config.getServerUrl()}/gh-user-repos`,
            method: 'GET',
            data: {
                userName: 'gaearon',
            }
        };

        // nock('https://api.github.com')
        //     .get('/repos/gaearon/react')
        //     .reply(200, this.getContents('gaearon.react.json'))
        //     .persist();
        //
        // nock('https://api.github.com')
        //     .get('/repos/gaearon/enzyme')
        //     .reply(200, this.getContents('gaearon.enzyme.json'))
        //     .persist();
        //
        // nock('https://api.github.com')
        //     .get('/repos/gaearon/react')
        //     .reply(200, this.getContents('gaearon.react.json'))
        //     .persist();


        HttpHelper
            .request(config)
            .then((res: any) => {

                console.log(res);
                
                expect(res).to.be.an.instanceOf(Array);
                done();
            });
    }

    /**
     * @param {string} file
     * @return {string}
     */
    private getContents(file: string): string {
        return require(join(__dirname, `../../../test/fixtures/${file}`));
    }
}
