import * as mongoose from 'mongoose';

export interface ContainerUsageStats extends mongoose.document {
    memory: number;
    cpu: number;
    updateTime: Date;
}