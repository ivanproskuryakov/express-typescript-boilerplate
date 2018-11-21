import {HttpHelper} from "../helper/HttpHelper";
import {Request} from 'express';

export class GitHubService {

    private readonly url = 'https://api.github.com/repos';

    /**
     * @param {string} username
     * @param {string} repo
     */
    public getRepoDetails(username: string, repo: string): Promise<{}> {
        let config: {} = {
            url: `${this.url}/${username}/${repo}`
        };

        return HttpHelper
            .request(config)
            .then((data: {}) => {

                return Promise.resolve(data);
            });
    }

    /**
     * @param {string} userName
     * @param {Request} req
     */
    public getRepoCollection(userName: string, req: Request): Promise<{}> {
        return req.app.get('database')
            .fetchRepos()
            .then((repos: any) => {
                const reposGHInfo = [];

                for (let i = 0; i < repos.length; i++) {
                    reposGHInfo.push(this.getRepoDetails(repos[i].owner, repos[i].name));
                }

                return Promise.all(reposGHInfo);
            })
            .then((reposInfo: any) => {
                const result = [];

                for (let i = 0; i < reposInfo.length; i++) {
                    if (reposInfo[i].owner.login === userName) {
                        result.push({
                            userName,
                            repoName: reposInfo[i].name,
                            stars: reposInfo[i].stargazers_count
                        });
                    }
                }

                return Promise.resolve(result);
            });
    }

}