import Sequelize from 'sequelize';
import CONFIGS from './credentials';

const sequelize = new Sequelize(
    CONFIGS.CONFIGS.DB.DB,
    CONFIGS.CONFIGS.DB.USERNAME,
    CONFIGS.CONFIGS.DB.PASSWORD, 
       {
        host: CONFIGS.CONFIGS.DB.HOST,
        port: CONFIGS.CONFIGS.DB.PORT,
        protocol: 'mysql',
        dialect: 'mysql',
        // operatorsAliases: false,
        dialectOptions: {
            rejectUnauthorized: false
        },
        pool: {
            max: 100,
            min: 0,
            acquire: 100000,
            idle: 200000
        },
        define: {
            timestamps: false,
            freezeTableName:true
        },
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    });

let db= {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
