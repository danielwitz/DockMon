import {ContainerUsageStats} from '../interface/container-stats';
import {ContainerData} from '../interface/container-data';
import {HostData} from '../interface/host-data';

let fetch = require('node-fetch');

const hosts: string[] = process.env.DM_HOSTS ? JSON.parse(process.env.DM_HOSTS) : ['Hosts from configuration'];
const swarmManagerHost: string = process.env.SWARM_MANAGER ? JSON.parse(process.env.SWARM_MANAGER) : 'Swarm manager from configuration';
const swarmServicesNames: string[] = process.env.SERVICES_NAMES ? JSON.parse(process.env.SERVICES_NAMES) : ['Swarm services from configuration'];

export class ContainerStatsBusinessLogic {

    static async getDataFromAllHosts(): Promise<HostData[]> {
        let hostsDataPromises: Promise<HostData[]> = Promise.all(hosts.map(host => ContainerStatsBusinessLogic.getAllHostContainersData(host)));
        let swarmContainersDataPromises: Promise<HostData[]> = this.getAllSwarmContainersData(swarmManagerHost);
        return [...await hostsDataPromises, ...await swarmContainersDataPromises];
    }

    static async getAllHostContainersData(host): Promise<HostData> {
        let containers = await this.getAllHostContainers(host);
        return await this.buildContainersData(containers, host);
    }

    static async getAllHostContainers(host): Promise<any> {
        try {
            return await fetch(`http://${host}/containers/json?all=1`).then(res => res.json());
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

    private static async buildContainersData(containers, host: string): Promise<HostData> {
        let containerDataPromises: Promise<ContainerData>[] = containers.map(container => ContainerStatsBusinessLogic.buildContainerData(container, host));
        let data: ContainerData[] = await Promise.all(containerDataPromises);
        return {
            name: host,
            containers: data
        };
    }

    static async buildContainerData(container: any, host: string): Promise<ContainerData> {
        let stats = await ContainerStatsBusinessLogic.getContainerStats(container.Id, host);
        return {
            id: container.Id,
            name: container.Names[0],
            state: container.State,
            status: container.Status,
            stats: stats
        };
    }

    static async getContainerStats(id: string, host: string): Promise<ContainerUsageStats> {
        let data = await fetch(`http://${host}/containers/${id}/stats?stream=false`).then(res => res.json());
        return {
            memory: ContainerStatsBusinessLogic.calculateMemoryPercent(data.memory_stats),
            cpu: ContainerStatsBusinessLogic.calculateCpuPercent(data.precpu_stats, data.cpu_stats)
        }
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