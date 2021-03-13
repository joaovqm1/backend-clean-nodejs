Creating migrations
yarn sequelize migration:create --name=<migration-name>

Running migrations
yarn sequelize db:migrate

Undoing migrations
yarn sequelize db:migrate:undo

Creating seeders
yarn sequelize seed:generate --name <seeder-name>

Running seeders
npx sequelize-cli db:seed:<seeder-name>
npx sequelize-cli db:seed:all

Undoing seeders
yarn sequelize-cli db:seed:undo
yarn sequelize-cli db:seed:undo:all

Undoing specific seeder
yarn sequelize-cli db:seed:undo --seed <name-of-seed-as-in-data>


