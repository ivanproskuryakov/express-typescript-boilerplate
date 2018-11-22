The `params.dist.json` file contains the distribution of the settings used by the app.
To get it running you'll need to create `params.json` and adjust it.

### Running tests

```
npm run dev
```
### Running the app in development
```
npm run dev
```
### Running the app in staging|production
```
npm run dev
```

------

### API, curl commands

Repository collection:
```
curl -d userName=gaearon http://0.0.0.0:4000/gh-user-repos
```
Repository details:
```
curl -d repoName=react http://0.0.0.0:4000/gh-repo
```
