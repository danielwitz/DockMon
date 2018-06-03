import * as express from 'express';
import {HostActionsBusinessLogic} from "../business-logic/host-actions";

export class HostActionsAPI {
    static init(app: express.Application) {
        app.post('/addHost', HostActionsAPI.addNewHost);
        app.post('/removeHost', HostActionsAPI.removeHost);
        app.post('/addTag', HostActionsAPI.addTag);
        app.get('/hosts', HostActionsAPI.getHosts);
    }

    static addNewHost(req: express.Request, res: express.Response): void {
        if (req.body.dnsHostName && req.body.nickname) {
            HostActionsBusinessLogic.addNewHost(req.body.dnsHostName, req.body.nickname);
        } else {
            res.send('Error! did not add new host');
        }
    }

    static removeHost(req: express.Request, res: express.Response): void {
        if (req.body.dnsHostName) {
            HostActionsBusinessLogic.removeHost(req.body.dnsHostName);
        } else {
            res.send('Error! did not remove host');
        }
    }

    static addTag(req: express.Request, res: express.Response): void {
        if (req.body.hostName && req.body.tagName && req.body.nickName) {
            HostActionsBusinessLogic.addTag(req.body.hostName, req.body.tagName, req.body.nickName);
        } else {
            res.send('Error! did not add tag');
        }
    }

    static async getHosts(req: express.Request, res: express.Response): Promise<any> {
        const hosts = await HostActionsBusinessLogic.getHostsWithCurrentContainerStats();
        res.send(hosts);
    }
}