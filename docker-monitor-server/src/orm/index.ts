import * as mongoose from 'mongoose';
import {HostData} from '../interface/host-data';
import {ContainerData} from "../interface/container-data";
import {ContainerUsageStats} from "../interface/container-stats";

export const Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;

const containerStats = new Schema({
    containerId: {type: ObjectId, required: true},
    cpu: {type: Number, required: true},
    memory: {type: Number, required: true},
    updateTime: {type: Date, required: true},
});
const container = new Schema({
    hostId: {type: ObjectId, required: true},
    name: {type: String, required: true},
    id: {type: String, required: true},
    status: {type: String, required: true},
    state: {type: String, required: true},
    tags: {type: [String], required: false},
    stats: {type: [containerStats], required: false}
});

const host = new Schema({
    name: {type: String, required: true},
    nickname: {type: String, required: false},
    tags: {type: [String], required: false},
    containers: {type: [container], required: false}
});

export const Host = mongoose.model<HostData>('host', host, 'hosts', true);
export const Container = mongoose.model<HostData>('container', container, 'containers', true);
export const ContainerStats = mongoose.model<HostData>('containerStats', containerStats, 'stats', true);

export class Orm {

    static async init(): Promise<boolean> {
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

    static async retrieveHosts(findOptions = null): Promise<HostData[]> {
        return new Promise<HostData[]>(((resolve, reject) => {
            Host.find(findOptions ? findOptions : {}, (error, result) => {
                if (error) {
                    console.error(`retrieve hosts failed: ${error.message}\n ${error}`);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        }));
    }

    static async retrieveContainers(findOptions = null): Promise<ContainerData[]> {
        return new Promise<ContainerData[]>(((resolve, reject) => {
            Container.find(findOptions ? findOptions : {}, (error, result) => {
                if (error) {
                    console.error(`retrieve containers failed: ${error.message}\n ${error}`);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        }));
    }

    static async retrieveStats(findOptions = null): Promise<ContainerUsageStats[]> {
        return new Promise<ContainerUsageStats[]>(((resolve, reject) => {
            ContainerStats.find(findOptions ? findOptions : {}, (error, result) => {
                if (error) {
                    console.error(`retrieve stats failed: ${error.message}\n ${error}`);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        }));
    }

    static async retrieveLatestStats(containerId, limit = 1): Promise<ContainerUsageStats[]> {
        return new Promise<ContainerUsageStats[]>(((resolve, reject) => {
            ContainerStats.find({containerId: containerId})
                .sort({updateTime: -1})
                .limit(limit)
                .exec((error, result) => {
                    if (error) {
                        console.error(`retrieve stats failed: ${error.message}\n ${error}`);
                        reject(error);
                    }
                    else {
                        resolve(result);
                    }
                });
        }));
    }

    static async createHost(item: HostData): Promise<HostData> {
        return new Promise<HostData>(((resolve, reject) => {
            Host.create(item, (error, result) => {
                if (error) {
                    console.error(`create hosts failed: ${error.message}\n ${error}`);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        }));
    }

    static async createContainer(containerToCreate: ContainerData): Promise<ContainerData> {
        return new Promise<ContainerData>(((resolve, reject) => {
            Container.create(containerToCreate, (error, result) => {
                if (error) {
                    console.error(`create container failed: ${error.message}\n ${error}`);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        }));
    }

    static async createContainerStats(statsToCreate: ContainerUsageStats): Promise<ContainerUsageStats> {
        return new Promise<ContainerUsageStats>(((resolve, reject) => {
            ContainerStats.create(statsToCreate, (error, result) => {
                if (error) {
                    console.error(`create stats failed: ${error.message}\n ${error}`);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        }));
    }

    static async updateHost(name: string, item: HostData): Promise<HostData> {
        return new Promise<HostData>(((resolve, reject) => {
            Host.findOneAndUpdate({name: name}, item, (error, result) => {
                if (error) {
                    console.error(`update host failed: ${error.message}\n ${error}`);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        }));
    }

    static async updateContainer(id: string, hostId: string, item: ContainerData): Promise<ContainerData> {
        return new Promise<ContainerData>(((resolve, reject) => {
            Container.findOneAndUpdate({id: id, hostId: hostId}, item, {upsert: true}, (error, result) => {
                if (error) {
                    console.error(`update container failed: ${error.message}\n ${error}`);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        }));
    }

    static async updateContainerStats(updateTime: Date, containerId: string, item: ContainerUsageStats): Promise<ContainerUsageStats> {
        return new Promise<ContainerUsageStats>(((resolve, reject) => {
            ContainerStats.findOneAndUpdate({updateTime: updateTime, containerId: containerId}, item, {upsert: true}, (error, result) => {
                if (error) {
                    console.error(`update stats failed: ${error.message}\n ${error}`);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        }));
    }

    static async deleteHost(name: string): Promise<any> {
        return new Promise<any>(((resolve, reject) => {
            Host.findOneAndRemove({name: name}, (error, result) => {
                if (error) {
                    console.error(`delete host failed: ${error.message}\n ${error}`);
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        }));
    }
}
