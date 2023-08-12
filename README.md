<p align="center">
  <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 256 204"><path fill="#F26D61" d="M0 161.202h45.312l-14.039 42.396H0v-42.396ZM0 80.6h72l-14.036 42.396H0V80.601ZM0 0h98.692l-14.04 42.395H0V0Zm143.349 0H256v42.395H129.312L143.349 0ZM116.66 80.6H256v42.397H102.622l14.038-42.396Zm-26.69 80.602H256v42.396H75.933l14.037-42.396Z"/></svg>
</p>
<h1 align="center">
  To-do List Serverless API
</h1>
<p align="center">
  A blazing fast and lightweight To-do list API powered by Serverless Framework and AWS Lambda. 🚀
</p>

## Introduction

Hi! It's Jef, here is my solution to [Serverless Guru Challenge](https://github.com/serverless-guru/code-challenges/tree/master/code-challenge-5), I made a To-do list API using Serverless Framework and AWS Lambda.

A To-do is a simple combination of a description and a state (checked or not), so you can create, edit, delete, find and list to-dos.

## Table of Contents

- [Technology Stack](#technology-stack)
- [Features](#features)
- [Folder structure](#folder-structure)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Deploy](#deploy)
- [Tests](#tests)
- [CI/CD](#cicd)
- [Thank you!](#-thank-you)

## Technology Stack

- NodeJS
- TypeScript
- Serverless Framework v3
- AWS SDK v3 (TypeScript support)
- AWS Lambda (Node 18)
- AWS API Integration (HTTP API)
- AWS DynamoDB
- Tsup (bundle TypeScript with no config)
- Vitest (for unit and integration tests with no config)
- Zod (for input validations cleanest way possible)
- Webpack (for small lambda packages)
- Github Actions (for CI/CD)

## Features

There are many Serverless Framework templates over the internet using NodeJS, TypeScript, AWS Lambda, API Gateway and DynamoDB, but here's **why you should use mine template**:

- **Folder structure organized by feature set**: Increase your project with loose coupling and high cohesion
- **Clean architecture**:
  - Separated in Controllers, Use Cases, Repositories, DTOs, Entities
  - Fully SOLID principles compliant
  - Pure TypeScript: very lightweight (**you don't need a NestJS increasing your bundle and lambda running time, 🤔 huh?**)
- **Repository interface**: you could change database with less effort
- Small lambda .zip packages (less than 700 kB)
- Unit and Integration tests
- Support to run Lambda locally
- Runs a DynamoDB locally on Docker
- Multi-stage support (`local`, `dev`, `prod`)
- Automatically deploy `dev` and `prod` environments on push to `develop` and `main` branches
- Error handling with clearly messages

## Folder structure

I'm trying to convince you that you can increase your project with loose coupling and high cohesion 🎉

```
.
└── src/
    ├── entities/
    │   └── Todo.ts
    ├── repositories/
    │   ├── ITodosRepository.ts (repository specification)
    │   └── implementations/
    │       └── DynamodbTodosRepository.ts (connects to DynamoDB)
    └── useCases/
        └── Todos/
            ├── CreateTodo/
            │   ├── CreateTodoController.ts
            │   ├── CreateTodoDTO.ts
            │   ├── CreateTodoUseCase.ts
            │   ├── CreateTodoUseCase.unit.spec.ts (Unit Test)
            │   └── handler.js
            ├── DeleteTodo/
            ├── EditTodo/
            ├── FindTodo/
            ├── ListTodo/
            └── e2e.spec.ts (Integration Tests for Todos domain)
```

## Quick Start

1. `npm install` (install dependencies)
2. `npm run db:up` (install and run DynamoDB with Docker on port 8000)
3. `npm run db:migrate` (create table on DynamoDB)
4. `npm run dev` (build TypeScript and runs server on port 3000)

If everything is ok, you will see:

```
Server ready: http://localhost:3000 🚀
```

So, you can start using the API:

```sh
> curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{"description": "Awesome description"}'

{
  "message": "Created Todo.",
  "id": "5fa7083b-9386-44ce-8060-1f2a9c068e75"
}
```

```
> curl -X GET http://localhost:3000/todos -H "Content-Type: application/json"

[
  {
    "id":"5fa7083b-9386-44ce-8060-1f2a9c068e75",
    "description": "Awesome description",
    "checked": false
  }
]
```

## API Reference

Description                 | Method | URL         | Payload     | Response     
----------------------------|--------|-------------|-------------|--------------
Create new To-do            | POST   | /todos      | `{ "description": String }` | `{ "message": "Created Todo.", "id": UUID }`
Retrieve To-do by id        | GET    | /todos/{id} | -           | `{ "id": UUID, "description": String, "checked": Boolean }`
Retrieve all To-dos.        | GET    | /todos      | -           | `[ { "id": UUID, "description": String, "checked": Boolean } ]`
Edit To-do attributes by id | PUT    | /todos/{id} | `{"description": String (Required), "checked": Boolean (required) }` | `{ "message": "Edited Todo." }`
Delete to-do by id           | DELETE | /todos/{id} | -           | `{ "message": "Deleted Todo." }`

## Deploy

I not recommend you deploying locally, this template are ready to manage it using Github Actions, but you can do this using these commands:

- Deploy to dev environment: `npm run deploy:dev`
- Deploy to prod environment: `npm run deploy:prod`

## Tests

This templates uses Vitest for testing, it's very lightweight and runs very fast.

The tests run in watch mode by default, make changes in your code, hit save and it's like magic.

All you need to do is running the commands below:

- For unit tests:
  - `npm run tests`
- For integration tests:
  - `npm run db:up` (runs DynamoDB)
  - `npm run tests:e2e` (runs Test Suite)

## CI/CD

For configuring CI/CD, follow these steps:

1. Go to https://app.serverless.com > org > access keys > add
2. Give a name of your choise, and create
3. Copy the generated `access key`
4. Then add a new Secret to your Github Repository (Secrets and Variables > New repository secret)
5. Add SERVERLESS_ACCESS_KEY in `Name` field
6. Paste your generated `access key` in `Secret` field
7. Click in Add secret

It's done. From now, when you push code to:

- `develop` branch, `dev` environment will be deployed
- `main` branch, `prod` environment will be deployed

The pipelines are configured inside `.github/workflows` directory. These pipelines consists in:

- Run JS
- Install npm dependencies
- Build TypeScript
- Run Unit Tests
- Run DynamoDB Local
- Run Migrations
- Run Integration Tests
- Serverless deploy

## 😁 Thank you!

You arrived here, so thank you, was a good experience develop this challenge, see ya!

[LinkedIn](https://linkedin.com/in/jeferson-kersten/) | [mailto:jeferson.kersten@gmail.com](mailto:jeferson.kersten@gmail.com)