import * as express from 'express';
import {ContainerLogsBusinessLogic} from '../business-logic/container-logs';

export class ContainerLogsAPI {
    static init(app: express.Application) {
        app.get('/logs/getLogs/:host/:id/', ContainerLogsAPI.getLogsFromContainer);
        app.get('/logs/getLogs/:host/:id/:timestamp', ContainerLogsAPI.getLogsFromContainer);
    }

    static async getLogsFromContainer(req: express.Request, res: express.Response): Promise<any> {
        if (req.params.host && req.params.id) {
            try {
                res.send(await ContainerLogsBusinessLogic.getLogs(req.params.host, req.params.id, null));
            } catch (err) {
                console.error(err);
            }
        }
        else {
            res.send('Error! did not get the needed params!');
        }
    }
}

