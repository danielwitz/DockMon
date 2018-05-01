import * as mongoose from 'mongoose';
import {HostData} from '../interface/host-data';

export const Schema = mongoose.Schema;

const containerStats = new Schema({
    status: {type: String, required: true},
    state: {type: String, required: true},
    cpu: {type: Number, required: true},
    ram: {type: Number, required: true},
    updateTime: {type: Date, required: true},
});
const container = new Schema({
    name: {type: String, required: true},
    id: {type: String, required: true},
    stats: {type: [containerStats], required: false},
    tags: {type: [String], required: false},
})

const host = new Schema({
    name: {type: String, required: true},
    nickname: {type: String, required: false},
    tags: {type: [String], required: false},
    containers: {type: [container], required: false},
})

export const Host = mongoose.model<HostData>('host', host, 'hosts', true);
