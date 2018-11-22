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
        const config: {} = {
            url: `${BaseControllerTest.app.config.getServerUrl()}/gh-repo`,
            method: 'POST',
            data: {
                repoName: 'react',
            }
        };

        nock.cleanAll();
        nock('https://api.github.com')
            .get('/repos/gaearon/react')
            .reply(200, this.getContents('gaearon.react.json'))
            .persist();


        HttpHelper
            .request(config)
            .then((res: any) => {
                expect(res.userName).to.be.equal('gaearon');
                expect(res.repoName).to.be.equal('react');
                expect(res.stars).to.be.equal(8);

                done();
            });
    }

    @test('repoCollectionAction success')
    repoCollectionAction(done: Function) {
        const config: {} = {
            url: `${BaseControllerTest.app.config.getServerUrl()}/gh-user-repos`,
            method: 'POST',
            data: {
                userName: 'gaearon',
            }
        };

        nock.cleanAll();

        nock('https://api.github.com')
            .get('/repos/gaearon/react')
            .reply(200, this.getContents('gaearon.react.json'))
            .persist();
        nock('https://api.github.com')
            .get('/repos/gaearon/enzyme')
            .reply(200, this.getContents('gaearon.enzyme.json'))
            .persist();
        nock('https://api.github.com')
            .get('/repos/gaearon/create-react-app')
            .reply(200, this.getContents('gaearon.create-react-app.json'))
            .persist();

        nock('https://api.github.com')
            .get('/repos/getify/fasy')
            .reply(200, this.getContents('getify.fasy.json'))
            .persist();
        nock('https://api.github.com')
            .get('/repos/getify/Functional-Light-JS')
            .reply(200, this.getContents('getify.Functional-Light-JS.json'))
            .persist();
        nock('https://api.github.com')
            .get('/repos/getify/You-Dont-Know-JS')
            .reply(200, this.getContents('getify.You-Dont-Know-JS.json'))
            .persist();

        nock('https://api.github.com')
            .get('/repos/peggyrayzis/apollo-client')
            .reply(200, this.getContents('peggyrayzis.apollo-client.json'))
            .persist();
        nock('https://api.github.com')
            .get('/repos/peggyrayzis/apollo-client-devtools')
            .reply(200, this.getContents('peggyrayzis.apollo-client-devtools.json'))
            .persist();
        nock('https://api.github.com')
            .get('/repos/peggyrayzis/guide-to-graphql')
            .reply(200, this.getContents('peggyrayzis.guide-to-graphql.json'))
            .persist();


        HttpHelper
            .request(config)
            .then((res: any) => {

                expect(res).to.be.an.instanceOf(Array);
                expect(res.length).to.be.equal(3);
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
