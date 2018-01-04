import {ContainerUsageStats} from './container-stats';

export interface ContainerData {
    id: string;
    name: string;
    state: string;
    status: string;
    stats: ContainerUsageStats;
}