import {ContainerData} from './container-data';
import * as mongoose from 'mongoose';

export interface HostData extends mongoose.document {
    _id?: string;
    name: string;
    containers: ContainerData[];
    nickname: string;
    tags?: string[];
}