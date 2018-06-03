import * as express from 'express';
import {ContainerActionsBusinessLogic} from '../business-logic/container-actions';
import {Orm} from "../orm";

export class ContainerActionsAPI {
    static init(app: express.Application) {
        app.post('/actions/stop', ContainerActionsAPI.stopContainer);
        app.post('/actions/start', ContainerActionsAPI.startContainer);
        app.post('/actions/restart', ContainerActionsAPI.restartContainer);
        app.post('/actions/addTag', ContainerActionsAPI.addTag);

    }

    static stopContainer(req: express.Request, res: express.Response): void {
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

    static startContainer(req: express.Request, res: express.Response): void {
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

    static restartContainer(req: express.Request, res: express.Response): void {
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
    static async addTag(req: express.Request, res: express.Response): Promise<any> {
        if (req.body.containerName && req.body.tagName && req.body.hostName && req.body.nickName) {
            let [dbHost] = await Orm.retrieveHosts({name:req.body.hostName, nickname: req.body.nickName});
            let [dbContainer] = await Orm.retrieveContainers({name:req.body.containerName, hostId: dbHost._id});
            dbHost.tags = [...dbContainer.tags, req.body.tagName];
            const container =  await Orm.updateContainer(dbContainer.name, dbContainer.hostId, dbContainer)
            res.send(container);
        } else {
            res.send('Error! did not add tag');
        }
    }
}

