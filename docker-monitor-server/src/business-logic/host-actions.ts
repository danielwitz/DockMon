import {HostData} from "../interface/host-data";
import {Orm} from "../orm";

export class HostActionsBusinessLogic {
    private static hostsTags = [];

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

    static async addTag(hostName: string, tagName: string, nickname: string): Promise<HostData> {
        let [dbHost] = await Orm.retrieveHosts({name:hostName, nickname: nickname});
        dbHost.tags = [...dbHost.tags, tagName];
        return await Orm.updateHost(hostName, nickname, dbHost)
    }

    static async getHosts(): Promise<HostData[]> {
        let hosts: HostData[] = await Orm.retrieveHosts();
        HostActionsBusinessLogic.hostsTags.forEach(host => {
            for (let currHost of hosts) {
                if (host.hostName === currHost.name && host.nickName === currHost.nickname) {
                    currHost.tags.push(host.tagName);
                }
            }
        });

        return hosts;
    }

    static async getHostsWithCurrentContainerStats(): Promise<HostData[]> {
        const hosts = await HostActionsBusinessLogic.getHosts();
        const hostsPromises = hosts.map(async host => {
            const containers = await Orm.retrieveContainers({hostId: host._id});
            const containerPromises = containers.map(async container => {
                container.stats = await Orm.retrieveLatestStats(container._id);
                return container;
            });
            host.containers = await Promise.all(containerPromises);
            return host;
        });

        const result = await Promise.all(hostsPromises);
        return result;
    }
}