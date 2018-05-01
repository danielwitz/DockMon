import * as express from 'express';
import {HostActionsBusinessLogic} from "../business-logic/host-actions";
import {HostData} from "../interface/host-data";

export class HostActionsAPI {
    static init(app:express.Application) {
        HostActionsBusinessLogic.initConstHosts();
        app.post('/addHost', HostActionsAPI.addNewHost);
        app.post('/removeHost', HostActionsAPI.removeHost);
        app.get('/hosts', HostActionsAPI.getHosts);
    }

    static addNewHost(req:express.Request, res:express.Response): void {
        if (req.body.dnsHostName && req.body.nickname) {
            HostActionsBusinessLogic.addNewHost(req.body.dnsHostName, req.body.nickname);
        } else {
            res.send('Error! did not add new host');
        }
    }

    static removeHost(req:express.Request, res:express.Response): void {
        if (req.body.dnsHostName) {
            HostActionsBusinessLogic.removeHost(req.body.dnsHostName);
        } else {
            res.send('Error! did not remove host');
        }
    }

    static async getHosts(req: express.Request, res: express.Response): Promise<any>{
        const hosts =  await HostActionsBusinessLogic.getHosts();
        res.send(hosts);
    }
}