import {HostData} from "../interface/host-data";
import {Orm} from "../orm";
import {ContainerUsageStats} from "../interface/container-stats";
import {ContainerData} from "../interface/container-data";

export class HostActionsBusinessLogic {
    static async addNewHost(dnsHostName: string, nickname: string): Promise<HostData> {
        return await Orm.create({
            name: `${dnsHostName}:2375`,
            nickname: nickname,
            containers: []
        });
    }

    static async removeHost(dnsHostName: string): Promise<any> {
        return await Orm.delete(dnsHostName);
    }

    static async getHosts(): Promise<HostData[]> {
        const hosts = await Orm.retrieve();
        console.debug(`hosts fetched from db: ${JSON.stringify(hosts)}`)
        return hosts;
    }

    static async getHostsWithCurrentContainerStats(): Promise<HostData[]> {
        let hosts = await Orm.retrieve();
        const hosts1 =  hosts.map(host => {
            host.containers = host.containers.map(container =>
                this.getContainerWithLatestStats(container));
            return host;
        });

        return hosts1;
    }

    static getContainerWithLatestStats(container: ContainerData): ContainerData {
        container.stats = [this.getLatestStats(container.stats)];
        return container;
    }

    static getLatestStats(stats: ContainerUsageStats[]): ContainerUsageStats {
        return stats.sort((a, b) => a.updateTime <= b.updateTime ? 1 : -1)[0];
    }
}