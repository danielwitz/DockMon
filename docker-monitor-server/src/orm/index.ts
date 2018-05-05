import * as mongoose from 'mongoose';
import {HostData} from '../interface/host-data';

export const Schema = mongoose.Schema;

const containerStats = new Schema({
    cpu: {type: Number, required: true},
    memory: {type: Number, required: true},
    updateTime: {type: Date, required: true},
});
const container = new Schema({
    name: {type: String, required: true},
    id: {type: String, required: true},
    status: {type: String, required: true},
    state: {type: String, required: true},
    stats: {type: [containerStats], required: false},
    tags: {type: [String], required: false},
});

const host = new Schema({
    name: {type: String, required: true},
    nickname: {type: String, required: false},
    tags: {type: [String], required: false},
    containers: {type: [container], required: false},
});

export const Host = mongoose.model<HostData>('host', host, 'hosts', true);

export class Orm {

    static async init() : Promise<boolean>{
        return await Orm.connect();
    }

    static async connect(): Promise<boolean> {
        const uri = 'mongodb://dockmon:bRX-SGD-DZQ-26o@ds111078.mlab.com:11078/dockmon';
        return new Promise<boolean>(((resolve, reject) => {
            mongoose.connect(uri, (error) => {
                if (error) {
                    console.error(`an error accord while connecting to DB: ${error.message}\n ${error}`);
                    reject(error);
                }
                else {
                    console.log('Connected to MongoDb');
                    resolve(true);
                }
            });
        }));
    }

    static async retrieve(): Promise<HostData[]> {
        return new Promise<HostData[]>(((resolve, reject) => {
            Host.find({}, (error, result) =>{
                if(error){
                    console.error(`function retrieve failed: ${error.message}\n ${error}`);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        }));
    }

    static async create(item: HostData): Promise<HostData> {
        return new Promise<HostData>(((resolve, reject) => {
            Host.create(item, (error, result) =>{
                if(error){
                    console.error(`function retrieve failed: ${error.message}\n ${error}`);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        }));
    }

    static async update(name: string, item: HostData): Promise<HostData> {
        return new Promise<HostData>(((resolve, reject) => {
            Host.findOneAndUpdate({name: name}, item, (error, result) =>{
                if(error){
                    console.error(`function retrieve failed: ${error.message}\n ${error}`);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        }));
    }

    static async delete(name: string): Promise<any> {
        return new Promise<any>(((resolve, reject) => {
            Host.findOneAndRemove({name: name},(error, result) =>{
                if(error){
                    console.error(`function retrieve failed: ${error.message}\n ${error}`);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        }));
    }
}
