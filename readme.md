## Getting Started

This is a boilerplate for clean architecture in NodeJS using Typescript.

The project consist of a simple database implementation with an office acting as main table and an user linked to it.

Following the next instruction we will be able to run it on you local machien.

## Tools

The following tools should be installed in your machine:

- [NodeJs/NPM](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)
- [YARN](https://classic.yarnpkg.com/en/docs/install/#debian-stable)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

To avoid conflicts, please use the following versions of node and yarn:

- **Node**: 12.13.1
- **Yarn**: 1.22.5

If you have a different node version you can follow the next steps to upgrade or downgrade it:

- _sudo yarn global add n_
- _sudo n 12.13.1_

## Bulding

- _yarn install_
- _yarn dev_

Note that the command _dev_ will run a docker-compose which contains mysql and mysql adminer, so you don't need any of these in your machine.

## Database

Note that is pretty simple to use any other SQL database. If you want to do that we you will need to change docker compose and also change the database dialect in sequelize configuration.

To create a new database you just have to run **yarn create-database**.
By default an user will be createrd with both username and password "test".

To use migrations you can run any of the following steps:

- _yarn sequelize migration:create --name=<migration-name>_ (will create new migration file)
- _yarn migrates_ ou _yarn sequelize db:migrate_ (will run all migrations)
- _yarn undo-migrates_ ou _yarn sequelize db:migrate:undo_ (will undo all migrations)
- _yarn sequelize seed:generate --name <seeder-name>_ (will create a new seeder)
- _yarn sequelize-cli db:seed:<seeder-name>_ (will run only one seeder)
- _yarn sequelize-cli db:seed:all_ (will run all seeders)
- _yarn sequelize-cli db:seed:undo --seed <seeder-name>_ (will undo one seeder)
- _yarn sequelize-cli db:seed:undo:all_ (will undo all seeders)

## Tests

To test, just use any of the following commands:

- _yarn test_ (will run all tests)
- _yarn unit-test_ (will run all unit tests)
- _yarn one-unit-test <path>_ (will run only one unit test)
- _yarn integration-test_ (will run all integration tests)
- _yarn one-integration-test <path>_ (will run only one integration test)

## Contributing

This project is just a basic init for any project using NodeJs. It still need some improvements such as:

- Create GitHub Actions based in the GitLab Pipelines which can be found in the file .gitlab-ci.yaml
- Fix an husky error when building the image using Dockerfile

So you you are interested just see the CONTRIBUTING.md
