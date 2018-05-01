import * as mongoose from 'mongoose';
import {IRepository} from "../interface/repository";

export class Repository<T extends mongoose.Document> implements IRepository<T> {

    private model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this.model = schemaModel;
    }

    create(item: T): Promise<T> {
        return this.doModelAction(this.model.create, item);
    }

    retrieve(): Promise<T[]> {
        return this.doModelAction(this.model.find, {});
    }

    update(name: string, item: T): Promise<T> {
        return this.doModelAction(this.model.findOneAndUpdate, {name: name}, item, {upsert: true});
    }

    delete(name: string): Promise<any> {
        return this.doModelAction(this.model.remove, {name: name});
    }

    findOne(condition?: Object): mongoose.Query<T> {
        return this.doModelAction(this.model.findOne, condition);
    }

    find(condition?: Object, fields?: Object, options?: Object): Promise<mongoose.Query<T[]>> {
        return this.doModelAction(this.model.find, condition, options);
    }

    private doModelAction(action: (...args) => any, ...args): Promise<any> {
        return new Promise<any>(((resolve, reject) => {
            action(...args, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        }));
    }
}
