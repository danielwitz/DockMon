import {ContainerData} from './container-data';

export interface HostData {
    name: string;
    containers: ContainerData[];
    nickname: string;
}