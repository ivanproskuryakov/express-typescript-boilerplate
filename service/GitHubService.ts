import {HttpHelper} from "../helper/HttpHelper";
import {Request} from 'express';

export class GitHubService {

    private readonly url = 'https://api.github.com/repos';

    /**
     * @param {string} repoName
     * @param {Request} req
     */
    public getRepoDetails(repoName: string, req: Request): Promise<{}> {
        return req.app
            .get('database')
            .getRepoByName(repoName)
            .then((res: any) => {
                return this
                    .queryRepoDetails(res.owner, res.name)
                    .then((repoInfo: any) => {

                        return Promise.resolve(this.view(res.owner, repoInfo));
                    });
            });
    }

    /**
     * @param {string} userName
     * @param {Request} req
     */
    public getRepoCollection(userName: string, req: Request): Promise<{}> {
        return req.app
            .get('database')
            .fetchRepos()
            .then((repos: any) => {
                const reposGHInfo = [];

                for (let i = 0; i < repos.length; i++) {
                    reposGHInfo.push(this.queryRepoDetails(repos[i].owner, repos[i].name));
                }

                return Promise.all(reposGHInfo);
            })
            .then((reposInfo: any) => {
                const result = [];

                for (let i = 0; i < reposInfo.length; i++) {
                    if (reposInfo[i].owner.login === userName) {
                        result.push(
                            this.view(userName, reposInfo)
                        );
                    }
                }

                return Promise.resolve(result);
            });
    }

    /**
     * @param {string} username
     * @param {string} repo
     */
    private queryRepoDetails(username: string, repo: string): Promise<{}> {
        let config: {} = {
            url: `${this.url}/${username}/${repo}`
        };

        console.log(config);

        return HttpHelper
            .request(config)
            .then((data: {}) => {

                return Promise.resolve(data);
            });
    }

    /**
     * @param {{string}} userName
     * @param {{}} repo
     */
    private view(userName: string, repo: any): any {
        return {
            userName: userName,
            repoName: repo.name,
            stars: repo.stargazers_count
        }
    }


}