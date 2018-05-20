import {ContainerUsageStats} from '../interface/container-stats';
import {ContainerData} from '../interface/container-data';
import {HostData} from '../interface/host-data';
import {HostActionsBusinessLogic} from "./host-actions";
import {Orm} from "../orm";

let fetch = require('node-fetch');

const swarmManagerHost: string = '';
const swarmServicesNames: string[] = [];

export class ContainerStatsBusinessLogic {
    static async getDataFromAllHosts(): Promise<HostData[]> {
        const hosts = await HostActionsBusinessLogic.getHosts();
        return await Promise.all(hosts.map(host => ContainerStatsBusinessLogic.getAllHostContainersData(host)));
    }

    static async getAllHostContainersData(host: HostData): Promise<HostData> {
        const containers = await this.getAllHostContainers(host);
        return await this.buildContainersData(containers, host);
    }

    static async getAllHostContainers(host: HostData): Promise<any> {
        try {
            return await fetch(`http://${host.name}/containers/json?all=1`).then(res => res.json());
        } catch (error) {
            return Promise.resolve([]);
        }
    }

    static async getAllSwarmContainersData(swarmManager: string): Promise<HostData[]> {
        let allSwarmNodes = await fetch(`http://${swarmManager}/nodes`).then(res => res.json());
        let allSwarmNodesNames: string[] = allSwarmNodes.filter((node) => node.Status.State === 'ready')
            .map((node) => node.Description.Hostname + ':2375');
        let hostsData: HostData[] = await Promise.all(await allSwarmNodesNames
            .map(host => ContainerStatsBusinessLogic.getFilteredHostContainersData(host)));
        return hostsData.filter((hostsData) => hostsData.containers && hostsData.containers.length > 0);
    }

    static async getFilteredHostContainersData(host): Promise<HostData> {
        let allContainers: any[] = await this.getRunningHostContainers(host);
        let filteredContainers = allContainers.filter((container) => this.isValidContainer(container.Names[0]));
        return await this.buildContainersData(filteredContainers, host);
    }

    static async getRunningHostContainers(host): Promise<any> {
        try {
            return await fetch(`http://${host}/containers/json?filters={"status":["running"]}`).then(res => res.json());
        } catch (error) {
            return Promise.resolve([]);
        }
    }

    static isValidContainer(containerName: string): boolean {
        return swarmServicesNames.some((serviceName) => containerName.indexOf(serviceName) >= 0);
    }

    private static async buildContainersData(containers, host: HostData): Promise<HostData> {
        const containerDataPromises: Promise<ContainerData>[] = containers.map(container =>
            ContainerStatsBusinessLogic.buildContainerData(container, host));
        host.containers = await Promise.all(containerDataPromises);
        return host
    }

    static async buildContainerData(container: any, host: HostData): Promise<ContainerData> {
        let savedContainer = await Orm.updateContainer(container.Id, host._id, {
            hostId: host._id,
            id: container.Id,
            name: container.Names[0],
            status: container.Status,
            state: container.State,
            maxNormalCpu: dbContainer ? dbContainer.maxNormalCpu : 100,
            minNormalCpu: dbContainer ? dbContainer.minNormalCpu : 0,
            maxNormalMemory: dbContainer ? dbContainer.maxNormalMemory : 100,
        };
    }

    static getContainerStatsArray(containerId: string, containers: ContainerData[], stats: ContainerUsageStats): ContainerUsageStats[]{
        const container = containers.find(container => container.id === containerId);
        return container ? container.stats.concat(stats): [stats]
        });
        const stats = await ContainerStatsBusinessLogic.getContainerStats(container._id, container.Id, host.name);
        savedContainer.stats = [stats];
        return savedContainer;
    }

    static async getContainerStats(container_id: string, containerId: string, host: string): Promise<ContainerUsageStats> {
        const data = await fetch(`http://${host}/containers/${containerId}/stats?stream=false`).then(res => res.json());
        const memory = ContainerStatsBusinessLogic.calculateMemoryPercent(data.memory_stats);
        const cpu = ContainerStatsBusinessLogic.calculateCpuPercent(data.precpu_stats, data.cpu_stats)
        return await Orm.createContainerStats(
            {
                containerId: container_id,
                updateTime: new Date(),
                memory,
                cpu
            });
    }

    private static calculateMemoryPercent(memory_stats: any): number {
        return (memory_stats.usage / memory_stats.limit) * 100;
    }

    private static calculateCpuPercent(precpu_stats: any, cpu_stats: any): number {
        let cpuDelta = cpu_stats.cpu_usage.total_usage - precpu_stats.cpu_usage.total_usage;
        let systemDelta = cpu_stats.system_cpu_usage - precpu_stats.system_cpu_usage;
        return (cpuDelta / systemDelta) * 100;
    }
}