import {HostData} from "../interface/host-data";
import {Orm} from "../orm";

export class HostActionsBusinessLogic {
    static async addNewHost(dnsHostName: string, nickname: string): Promise<HostData> {
        return await Orm.createHost({
            name: `${dnsHostName}:2375`,
            nickname: nickname,
            containers: []
        });
    }

    static async removeHost(dnsHostName: string): Promise<any> {
        return await Orm.deleteHost(dnsHostName);
    }

    static async getHosts(): Promise<HostData[]> {
        return  await Orm.retrieveHosts();
    }

    static async getHostsWithCurrentContainerStats(): Promise<HostData[]> {
        const hosts = await Orm.retrieveHosts();
        const hostsPromises = hosts.map(async host => {
            const containers = await Orm.retrieveContainers({hostId: host._id});
            const containerPromises = containers.map(async container => {
                container.stats = await Orm.retrieveLatestStats(container._id);
                return container;
            });
            host.containers = await Promise.all(containerPromises);
            return host;
        });

        const result =  await Promise.all(hostsPromises);
        return result;
    }
}