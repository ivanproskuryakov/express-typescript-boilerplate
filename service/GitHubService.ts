import {HttpHelper} from "../helper/HttpHelper";

export class GitHubService {

    private readonly url = 'https://api.github.com/repos';

    /**
     * @param {string} username
     * @param {string} repo
     */
    public queryRepositoryInfo(username: string, repo: string): Promise<{}> {
        let config: {} = {
            url: `${this.url}/${username}/${repo}`
        };

        return HttpHelper
            .request(config)
            .then((data: {}) => {

                return Promise.resolve(data);
            });
    }

}