import {Request, Response} from 'express';
import {GitHubService} from "../../service/GitHubService";

export class GitHubController {

    /**
     * @param {Request} req
     * @param {Response} res
     */
    public repoDetailsAction(req: Request, res: Response) {
        const gitHubService = new GitHubService();

        gitHubService
            .getRepoDetails(req.body.username, req.body.repo)
            .then(data => res.status(200).send(data))
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    public repoCollectionAction(req: Request, res: Response) {
        const gitHubService = new GitHubService();

        gitHubService
            .getRepoCollection(req.body.username, req)
            .then(data => res.status(200).send(data))
    }

}