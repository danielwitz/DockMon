import {HostData} from "../interface/host-data";
import {Orm} from "../orm";

let hosts: HostData[] = [];

export class HostActionsBusinessLogic {
    static initConstHosts(): void {
        hosts.push({
            name: 'ec2-18-222-156-26.us-east-2.compute.amazonaws.com:2375',
            nickname: 'Server1',
            containers: []
        });
        hosts.push({
            name: 'ec2-18-188-226-134.us-east-2.compute.amazonaws.com:2375',
            nickname: 'Server2',
            containers: []
        });
        hosts.push({
            name: 'ec2-18-188-237-156.us-east-2.compute.amazonaws.com:2375',
            nickname: 'Server3',
            containers: []
        });
    }

    static async addNewHost(dnsHostName: string, nickname: string): Promise<HostData> {
        return await Orm.create({
            name: `${dnsHostName}:2375`,
            nickname: nickname,
            containers: []
        });
        // hosts.push({
        //     name: dnsHostName + ':2375',
        //     nickname: nickname,
        //     containers: []
        // });
    }

    static async removeHost(dnsHostName: string): Promise<any> {
       return await Orm.delete(dnsHostName);
        // hosts = hosts.filter(host => host.name !== dnsHostName);
    }

    static async getHosts(): Promise<HostData[]> {
        console.log('retrieving hosts')
        const hosts = await Orm.retrieve();
        console.log(`hosts fetched from db: ${JSON.stringify(hosts)}`)
        return hosts;
    }
}