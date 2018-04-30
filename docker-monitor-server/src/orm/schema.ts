import * as mongoose from 'mongoose';
import {HostData} from "../interface/host-data";

export let Schema = mongoose.Schema;

let containerStats = new Schema({
    status: {type: String, required: true},
    state: {type: String, required: true},
    cpu: {type: Number, required: true},
    ram: {type: Number, required: true},
    updateTime: {type: Date, required: true},
})
let container = new Schema({
    name: {type: String, required: true},
    id: {type: String, required: true},
    stats: {type: [containerStats], required: false},
    tags: {type: [String], required: false},
})

let host = new Schema({
    name: {type: String, required: true},
    nickname: {type: String, required: false},
    tags: {type: [String], required: false},
    containers: {type: [container], required: false},
})

export let HostSchema = mongoose.model<HostData>('hero', host, 'hosts', true);
