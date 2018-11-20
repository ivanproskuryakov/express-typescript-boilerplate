import axios from "axios";
import {Request, Response} from 'express';

export class GitHubController {

    /**
     * @param {Request} req
     * @param {Response} res
     */
    public static postAction(req: Request, res: Response) {
        const {userName} = req.body;

        const getGHRepoInfo = (owner: any, repoName: any) =>
            axios
                .get(`https://api.github.com/repos/${owner}/${repoName}`)
                .then(res => res.data);

        req.get('database')
            .fetchRepos()
            .then((repos: any) => {
                const reposGHInfo = [];

                for (let i = 0; i < repos.length; i++) {
                    reposGHInfo.push(getGHRepoInfo(repos[i].owner, repos[i].name));
                }

                return Promise.all(reposGHInfo);
            })
            .then(reposInfo => {
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

                res.status(200).send(result);
            });
    }
}