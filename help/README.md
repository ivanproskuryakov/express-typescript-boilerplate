# Github Repository Information

API which returns information about github repositories of selected users.

## Running the App

This API is an express web server over node v10.6 written in Typescript 3.1.

First, install its dependencies by running `npm install` in the root directory.

Finally, you are required to run the following commands in sequence to start the application:

- `npm run build`: compiles the code from TS to JS;
- `npm start`: starts the application on `http://localhost:4000/`;

## API

Endpoint

```text
POST /gh-user-repos
```

Request example

```text
curl -d userName=<USER_NAME> http://localhost:4000/gh-user-repos
```

Response example

```text
[
  { "userName":"<USER_NAME>", "repoName":"<REPOSITORY_NAME_1>", "stars":42 },
  { "userName":"<USER_NAME>", "repoName":"<REPOSITORY_NAME_2>", "stars":51 },
  ...
]
```

Variables in these examples:

- `<USER_NAME>`: refers to the selected users and can be only `gaearon`, `getify` or `peggyrayzis`;
- `<REPOSITORY_NAME_X>`: refers to the name of the repository;
