import {Request} from 'express';

import {HttpHelper} from "../helper/HttpHelper";
import {RepoViewInterface} from "../interface/domain/RepoViewInterface";
import {RepoModelInterface} from "../interface/domain/RepoModelInterface";

export class GitHubService {

    private readonly url = 'https://api.github.com/repos';

    /**
     * @param {string} repoName
     * @param {Request} req
     * @return Promise<RepoViewInterface>
     */
    public getRepoDetails(repoName: string, req: Request): Promise<RepoViewInterface> {
        return req.app
            .get('database')
            .getRepoByName(repoName)
            .then((res: any) => {

                return this
                    .queryRepoDetails(res.owner, res.name)
                    .then((repoInfo: any) => {

                        return Promise.resolve(this.buildView(res.owner, repoInfo));
                    });
            });
    }

    /**
     * @param {string} userName
     * @param {Request} req
     * @return Promise<RepoViewInterface[]>
     */
    public getRepoCollection(userName: string, req: Request): Promise<RepoViewInterface[]> {
        return req.app
            .get('database')
            .fetchRepos()
            .then((repos: RepoModelInterface[]) => {
                const reposGHInfo = [];

                for (let i = 0; i < repos.length; i++) {
                    reposGHInfo.push(this.queryRepoDetails(repos[i].owner, repos[i].name));
                }

                return Promise.all(reposGHInfo);
            })
            .then((reposInfo: any) => {
                const result: RepoViewInterface[] = [];

                for (let i = 0; i < reposInfo.length; i++) {
                    if (reposInfo[i].owner.login === userName) {
                        result.push(
                            this.buildView(userName, reposInfo)
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

        return HttpHelper
            .request(config)
            .then((data: {}) => {

                return Promise.resolve(data);
            });
    }

    /**
     * @param {{string}} userName
     * @param {{}} repo
     * @return RepoViewInterface
     */
    private buildView(userName: string, repo: any): RepoViewInterface {
        return {
            userName: userName,
            repoName: repo.name,
            stars: repo.stargazers_count
        }
    }


}