import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import {ContainerStatsAPI} from './api/container-stats';
import {ContainerActionsAPI} from './api/container-actions';
import {ContainerLogsAPI} from './api/container-logs';
import {ContainerExtraDetailsApi} from './api/container-extra-details';
import {HostActionsAPI} from "./api/host-actions";
import {Orm} from './orm';
import {ContainerStatsBusinessLogic} from './business-logic/container-stats';
import {Observable} from "rxjs/Rx";

const APPLICATION_PORT = process.env.DM_PORT ? process.env.DM_PORT : 1111;

const app: express.Application = express();
app.use(cors());
app.use(bodyParser.json());
Orm.init().then(() => {
    HostActionsAPI.init(app);
    ContainerStatsAPI.init(app);
    ContainerActionsAPI.init(app);
    ContainerLogsAPI.init(app);
    ContainerExtraDetailsApi.init(app);

    app.listen(APPLICATION_PORT, () => {
        console.log(`App is running on port ${APPLICATION_PORT}. Have Fun!`);
        importHosts();
    });
}).catch((error) => console.error(`could not connect to db: ${error.message} \n ${error}`));

const importHosts = () => {
    Observable.interval(3000).switchMap(async () => {
        const hosts = await ContainerStatsBusinessLogic.getDataFromAllHosts();
        hosts.forEach(host => {
            Orm.update(host.name, host);
        })
    }).subscribe((value) => console.log(JSON.stringify(value)));
}
