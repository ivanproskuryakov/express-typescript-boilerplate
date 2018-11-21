import {Request, Response} from 'express';
import {GitHubService} from "../../service/GitHubService";

export class GitHubController {

    /**
     * @param {Request} req
     * @param {Response} res
     */
    public queryAction(req: Request, res: Response) {
        const gitHubService = new GitHubService();

        gitHubService
            .queryRepositoryInfo(req.body.username, req.body.repo)
            .then(data => res.status(200).send(data))
    }


}