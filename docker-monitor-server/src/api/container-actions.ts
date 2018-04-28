import * as express from 'express';
import {ContainerActionsBusinessLogic} from '../business-logic/container-actions';
import {ContainerStatsBusinessLogic} from "../business-logic/container-stats";

export class ContainerActionsAPI {
    static init(app:express.Application) {
        app.post('/actions/stop', ContainerActionsAPI.stopContainer);
        app.post('/actions/start', ContainerActionsAPI.startContainer);
        app.post('/actions/restart', ContainerActionsAPI.restartContainer);
        app.put('/addHost/', ContainerActionsAPI.addNewHost);
    }

    static addNewHost(req:express.Request, res:express.Response): void {
        if (req.body.dnsHostName && req.body.nickname) {
            ContainerStatsBusinessLogic.addNewHost(req.body.dnsHostName, req.body.nickname);
        } else {
            res.send('Error! did not add new host');
        }
    }

    static stopContainer(req:express.Request, res:express.Response):void {
        if (req.body.host && req.body.id) {
            ContainerActionsBusinessLogic.doAction('stop', req.body.host, req.body.id)
                .then((data) => {
                        res.send(JSON.stringify(data));
                    }
                ).catch((error) => {
                    console.error(error);
                }
            );
        } else {
            res.send('Error! did not get the needed params!');
        }
    }

    static startContainer(req:express.Request, res:express.Response):void {
        if (req.body.host && req.body.id) {
            ContainerActionsBusinessLogic.doAction('start', req.body.host, req.body.id)
                .then((data) => {
                        res.send(JSON.stringify(data));
                    }
                ).catch((error) => {
                    console.error(error);
                }
            );
        } else {
            res.send('Error! did not get the needed params');
        }
    }

    static restartContainer(req:express.Request, res:express.Response):void {
        if (req.body.host && req.body.id) {
            ContainerActionsBusinessLogic.doAction('restart', req.body.host, req.body.id)
                .then((data) => {
                        res.send(JSON.stringify(data));
                    }
                ).catch((error) => {
                    console.error(error);
                }
            );
        } else {
            res.send('Error! did not get the needed params!');
        }
    }
}

