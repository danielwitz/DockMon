import {ContainerUsageStats} from './container-stats';
import * as mongoose from 'mongoose';

export interface ContainerData extends mongoose.document{
    id: string;
    name: string;
    stats: ContainerUsageStats;
}