import * as express from 'express';
import {HostActionsBusinessLogic} from '../business-logic/host-actions';
import {ContainerStatsBusinessLogic} from '../business-logic/container-stats';
import {Orm} from '../orm';

export class ContainerStatsAPI {
    static init(app: express.Application) {
        app.get('/stats/getDataFromAllHosts', ContainerStatsAPI.getDataFromAllHosts);
        app.get('/stats/container/:hostName/:containerId', ContainerStatsAPI.getContainerStatsHistory)
    }

    static async getContainerStatsHistory(req, res): Promise<any> {
        const {hostName, containerId} = req.params;
        const data = await Orm.retrieve();
        const hostData = data.find(({name}) => name === hostName);
        const container = hostData.containers.find(({id}) => id === containerId);
        res.send(container);
    }

    static async getDataFromAllHosts(req: express.Request, res: express.Response): Promise<any> {
        let data = await HostActionsBusinessLogic.getHosts();
        res.send(data);
    }

}

