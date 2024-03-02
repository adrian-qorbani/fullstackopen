const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require('umzug')
// const { DATABASE_URL } = require('./config')

// const sequelize = new Sequelize(DATABASE_URL)

// const runMigrations = async () => {
//   const migrator = new Umzug({
//     migrations: {
//       glob: 'migrations/*.js',
//     },
//     storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
//     context: sequelize.getQueryInterface(),
//     logger: console,
//   })
  
//   const migrations = await migrator.up()
//   console.log('Migrations up to date', {
//     files: migrations.map((mig) => mig.name),
//   })
// }

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}
  
const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}
const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false
    // }
  },
});

// const connectToDatabase = async () => {
//   try {
//     await sequelize.authenticate()
//     await runMigrations()
//     console.log('connected to the database')
//   } catch (err) {
//     console.log('failed to connect to the database')
//     console.log(err)
//     return process.exit(1)
//   }

//   return null
// }

// module.exports = { connectToDatabase, sequelize }

module.exports = { connectToDatabase, sequelize, rollbackMigration }
