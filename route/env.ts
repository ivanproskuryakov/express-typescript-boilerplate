import axios from "axios";
import {DBClient} from "../database";

app.post('/gh-user-repos', (request, response) => {
    const { userName } = request.body;

    const getGHRepoInfo = (owner: any, repoName: any) =>
        axios
            .get(`https://api.github.com/repos/${owner}/${repoName}`)
            .then(res => res.data);

    const dbClient = new DBClient('user1', 'the password');

    dbClient
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

            response.status(200).send(result);
        });
});
