# Extending the API

Implement another endpoint on the API named `/gh-repo` which should return the information
of a repository in the database given its name.

For example, when making a request to this new endpoint with the parameter
`repoName` valuing `react` the response should be `{ id: 100, name: 'react', owner: 'gaearon' }`.

Remember to document the new API in the `README.md`.
