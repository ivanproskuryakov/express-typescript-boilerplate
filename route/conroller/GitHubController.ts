import {Request, Response} from 'express';
import {GitHubService} from "../../service/GitHubService";

export class GitHubController {

    /**
     * @param {Request} req
     * @param {Response} res
     */
    public queryAction(req: Request, res: Response) {
        const gitHubService = new GitHubService();
        console.log(req.params);

        gitHubService
            .queryRepositoryInfo('ivanproskuryakov', 'Aisel')
            .then(data => res.status(200).send(data))
    }


}