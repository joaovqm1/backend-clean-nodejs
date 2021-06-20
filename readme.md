Creating migrations
yarn sequelize migration:create --name=<migration-name>

Running migrations
yarn sequelize db:migrate ou
npx sequelize db:migrate --url 'mysql://projetei:projetei@localhost/dev'

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

sequelize db:drop --url 'mysql://projetei:devprojeteiawsrds2020@production.czxilwiw7mzd.us-east-2.rds.amazonaws.com/dev'
npx sequelize db:create --url 'mysql://projetei:flthnmwmlo4snqb0@db-mysql-nyc3-56288-do-user-9244243-0.b.db.ondigitalocean.com:25060/production'
