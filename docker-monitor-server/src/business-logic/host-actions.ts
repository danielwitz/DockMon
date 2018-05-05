import {HostData} from "../interface/host-data";

let hosts: HostData[] = [];

export class HostActionsBusinessLogic {

    static initConstHosts(): void {
        hosts=[{
            name: '18.222.104.33:2375',
            nickname: 'Server1',
            containers: []
        }];
    }

    static addNewHost(dnsHostName: string, nickname: string): void {
        hosts.push({
            name: dnsHostName + ':2375',
            nickname: nickname,
            containers: []
        });
    }

    static removeHost(dnsHostName: string): void {
        hosts = hosts.filter(host => host.name !== dnsHostName);
    }

    static getHosts(): HostData[] {
        return hosts;
    }
}