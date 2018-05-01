import {HostRepository} from './host-repository';
import * as mongoose from 'mongoose';
import {HostData} from "../interface/host-data";

const hostRepository: HostRepository = new HostRepository();

export class Orm {

    static async init() {
       await Orm.connect();
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
        return await hostRepository.retrieve();
    }

    static async create(item: HostData): Promise<HostData> {
        return await hostRepository.create(item);
    }

    static async update(name: string, item: HostData): Promise<HostData> {
        return await hostRepository.update(name, item);
    }

    static async delete(name: string): Promise<any> {
        return await hostRepository.delete(name);
    }

    static async findOne(condition?: Object): Promise<mongoose.Query<HostData>> {
        return await hostRepository.findOne(condition);
    }

    static async find(condition?: Object, fields?: Object, options?: Object): Promise<mongoose.Query<HostData[]>> {
        return await hostRepository.find(condition, fields, options);
    }
}
