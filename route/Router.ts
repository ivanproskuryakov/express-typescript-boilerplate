import {GitHubController} from './conroller/GitHubController';
import express from 'express';

export class Router {
  public gitHubController: GitHubController;

  constructor() {
    this.gitHubController = new GitHubController();
  }

  /**
   * @return express.Router()
   */
  public buildRoutes() {
    return express
    .Router()
    .post(`/gh-repo`, this.gitHubController.repoDetailsAction)
    .post(`/gh-user-repos`, this.gitHubController.repoCollectionAction);
  }
}
