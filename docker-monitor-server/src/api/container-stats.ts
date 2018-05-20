import * as express from 'express';
import {HostActionsBusinessLogic} from '../business-logic/host-actions';
import {ContainerStatsBusinessLogic} from '../business-logic/container-stats';
import {Orm} from '../orm';

export class ContainerStatsAPI {
    static init(app: express.Application) {
        app.get('/stats/container/:hostName/:containerId', ContainerStatsAPI.getContainerStatsHistory)
    }

    static async getContainerStatsHistory(req, res): Promise<any> {
        const {hostName, containerId} = req.params;
        const {_id} = await Orm.retrieveHosts({name: hostName})[0];
        const container = await Orm.retrieveContainers({id: containerId, hostId: _id})[0];
        let historyFrom = new Date();
        historyFrom.setHours(historyFrom.getHours() + 2);
        container.stats = await Orm.retrieveStats({containerId: container._id, updateTime: { $gte: historyFrom}})
        res.send(container);
    }
}
