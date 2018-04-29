import * as Sequelize from 'sequelize';

export const sequelize: Sequelize.Sequelize = new Sequelize('postgres', 'postgres', '', {
    host: 'postgres',
    dialect: 'postgres'
});