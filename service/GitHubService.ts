import {HttpHelper} from "../helper/HttpHelper";

export class GitHubService {

    private readonly url = 'https://api.github.com/repos';

    /**
     * @param {string} username
     * @param {string} repo
     */
    public queryRepositoryInfo(username: string, repo: string): Promise<{}> {
        const url = `${this.url}/${username}/${repo}`;

        return HttpHelper
            .request(url)
            .then((data: {}) => {
                // console.log(req.params);
                // res.status(200).send(data);

                return Promise.resolve(data);
            });
    }

}