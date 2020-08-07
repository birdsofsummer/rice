# https://sequelize.org/v5/manual/migrations.html

npm install --save sequelize-cli

cd src
md db

npx sequelize-cli init
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

ls db/migrations
ls db/models


npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js

npx sequelize-cli seed:generate --name demo-user
npx sequelize-cli db:seed:all

npx sequelize-cli db:seed:undo
npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data
npx sequelize-cli db:seed:undo:all


npx sequelize-cli migration:generate --name migration-skeleton
#npx sequelize-cli db:migrate --url 'mysql://root:password@mysql_host.com/database_name'
npx sequelize-cli db:migrate --url 'postgresql://postgres:postgres@localhost:5432/rice'

