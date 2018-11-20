import {GitHubController} from "./conroller/GitHubController";
import express from 'express';

export class Router {

    /**
     * @return express.Router()
     */
    public static init() {
        return express.Router().post(`/gh-user-repos`, GitHubController.postAction);
    }

}