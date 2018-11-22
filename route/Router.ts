import {GitHubController} from './conroller/GitHubController';
import express from 'express';

export class Router {
    /**
     * @return express.Router()
     */
    public static init() {
        const gitHubController = new GitHubController();

        return express
            .Router()
            .post(`/gh-repo`, gitHubController.repoDetailsAction)
            .post(`/gh-user-repos`, gitHubController.repoCollectionAction);
    }
}
