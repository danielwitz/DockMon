import {ContainerUsageStats} from './container-stats';
import * as mongoose from 'mongoose';

export interface ContainerData extends mongoose.document{
    id: string;
    name: string;
    state: string;
    status: string;
    stats: ContainerUsageStats[];
    tags?: string[];
    maxNormalCpu? : number;
    minNormalCpu? : number;
    maxNormalMemory? : number;
}