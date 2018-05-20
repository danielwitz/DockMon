import * as mongoose from 'mongoose';

export interface ContainerUsageStats extends mongoose.document {
    _id?: string;
    containerId: string;
    memory: number;
    cpu: number;
    updateTime: Date;
}