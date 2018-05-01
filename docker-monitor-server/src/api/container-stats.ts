import * as express from 'express';
import {HostActionsBusinessLogic} from "../business-logic/host-actions";

export class ContainerStatsAPI {
    static init(app: express.Application) {
        app.get('/stats/getDataFromAllHosts', ContainerStatsAPI.getDataFromAllHosts);
    }

    static async getDataFromAllHosts(req: express.Request, res: express.Response): Promise<any> {
        let data = await HostActionsBusinessLogic.getHosts();
        res.send(data);
    }
}

