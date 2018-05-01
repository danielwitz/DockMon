import * as mongoose from 'mongoose';

export interface IRepository<T> {
    retrieve: () => Promise<T[]>;

    findOne(condition?: Object): Promise<mongoose.Query<T>>;

    find(condition?: Object, fields?: Object, options?: Object): Promise<mongoose.Query<T[]>>;

    create: (item: T) => Promise<T>;
    update: (name: string, item: T) => Promise<T>;
    delete: (name: string) => Promise<any>;
}