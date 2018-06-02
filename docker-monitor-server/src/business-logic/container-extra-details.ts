import * as request from 'request';
import {Details} from '../interface/details';
import {PortBinding} from '../interface/port-binding';
import {Mount} from '../interface/mount';

export class ContainerExtraDetails {
    static getDetails(host: string, id: string): Promise<Details> {
        return new Promise(((resolve, reject) => {
            request(`http://${host}/containers/${id}/json`, (err, _, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(ContainerExtraDetails.parseDetails(res, host, id));
                }
            })
        }));
    }

    private static parseDetails(containerDetails: string, host: string, id: string): Details {
        const details = JSON.parse(containerDetails);

        if (details && details.Config && details.HostConfig) {
            return {
                portBindings: ContainerExtraDetails.parsePortBindings(details.HostConfig.PortBindings),
                envParams: details.Config.Env,
                image: details.Config.Image,
                mounts: ContainerExtraDetails.parseMounts(details.Mounts)
            }
        }
        else {
            console.error(`failed to get details for ${host}/${id}: \n ${containerDetails}`);
            return null;
        }
    }

    private static parsePortBindings(bindings: any): PortBinding[] {
        const portBindings = [];
        const ports = Object.keys(bindings);
        ports.forEach((port) => {
            portBindings.push({innerPort: port, hostPort: bindings[port][0].HostPort})
        });

        return portBindings;
    }

    private static parseMounts(containerMounts: any[]): Mount[] {
        return containerMounts.map((mount) => {
            return {destination: mount.Destination, source: mount.Source}
        });
    }
}