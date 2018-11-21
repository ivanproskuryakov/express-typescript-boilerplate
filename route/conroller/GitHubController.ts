import {Request, Response} from 'express';
import {HttpHelper} from "../../helper/HttpHelper";

export class GitHubController {

    /**
     // * @param {Request} request
     // * @param {Response} response
     */
    public postAction(req: Request, res: Response) {
        HttpHelper
            .request('https://jsonplaceholder.typicode.com/posts/1')
            .then(data => {
                console.log(req.params);
                res.status(200).send(data);
            });
    }

}