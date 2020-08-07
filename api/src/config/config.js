const fs = require('fs');


//'mysql' | 'mariadb' | 'postgres' | 'mssql'
const config= {
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "rice_development",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false,
    "migrationStorage": "json",
    "migrationStoragePath": "sequelizeMeta.json",
    "migrationStorageTableName": "sequelize_meta",
    "migrationStorageTableSchema": "custom_schema",
    "seederStorage": "json",
    "seederStoragePath": "sequelizeData.json",
    "seederStorageTableName": "sequelize_data",
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    "dialect": "postgres",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    "dialect": "postgres",
    dialectOptions: {
      "bigNumberStrings": true,
      ssl: {
       // ca: fs.readFileSync(__dirname + '/pg-ca-master.crt')
      }
    }
  }
};

for (let k in config) {
   let {
        username,
        password,
        database,
        host,
        dialect,
    }=config[k]

    let s=`postgresql://${username}:${password}@${host}/${database}`
    config[k]["connectionString"]=s
}

module.exports =config
