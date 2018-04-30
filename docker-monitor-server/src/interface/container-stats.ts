import * as mongoose from 'mongoose';

export interface ContainerUsageStats extends mongoose.document {
    memory: number;
    cpu: number;
    state: string;
    status: string;
    updateTime: Date;
}