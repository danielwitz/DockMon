import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import {ContainerStatsAPI} from './api/container-stats';
import {ContainerActionsAPI} from './api/container-actions';
import {ContainerLogsAPI} from './api/container-logs';
import {ContainerExtraDetailsApi} from './api/container-extra-details';
import {HostActionsAPI} from "./api/host-actions";
import {Orm} from "./orm";
import {ContainerStatsBusinessLogic} from "./business-logic/container-stats";

const APPLICATION_PORT = process.env.DM_PORT ? process.env.DM_PORT : 1111;

const app: express.Application = express();
app.use(cors());
app.use(bodyParser.json());
Orm.init();
HostActionsAPI.init(app);
ContainerStatsAPI.init(app);
ContainerActionsAPI.init(app);
ContainerLogsAPI.init(app);
ContainerExtraDetailsApi.init(app);

app.listen(APPLICATION_PORT, () => {
    console.log(`App is running on port ${APPLICATION_PORT}. Have Fun!`);
    importHosts();
});

const importHosts = () => {
    return new Promise((async (resolve, reject) => {
        while(true){
            const hosts = await ContainerStatsBusinessLogic.getDataFromAllHosts();
            hosts.forEach(host => Orm.update(host.name, host))
        }
    }));
}
