import * as Sequelize from 'sequelize';
import {sequelize} from '../db';

export const User = sequelize.define<UserInstance, UserAttributes>('user', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
});

export interface UserInstance extends Sequelize.Instance<UserAttributes> {
}

export interface UserAttributes {
    username: string,
    birthday: Date
}