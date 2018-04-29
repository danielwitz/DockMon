import * as express from 'express';
import {HostActionsBusinessLogic} from "../business-logic/host-actions";

export class HostActionsAPI {
    static init(app:express.Application) {
        HostActionsBusinessLogic.initConstHosts();
        app.post('/addHost', HostActionsAPI.addNewHost);
        app.post('/removeHost', HostActionsAPI.removeHost);
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
}