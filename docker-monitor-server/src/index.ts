import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import {ContainerStatsAPI} from './api/container-stats';
import {ContainerActionsAPI} from './api/container-actions';
import {ContainerLogsAPI} from './api/container-logs';
import {ContainerExtraDetailsApi} from './api/container-extra-details';
import {HostActionsAPI} from "./api/host-actions";

const APPLICATION_PORT = process.env.DM_PORT ? process.env.DM_PORT : 1111;

const app: express.Application = express();
app.use(cors());
app.use(bodyParser.json());
HostActionsAPI.init(app);
ContainerStatsAPI.init(app);
ContainerActionsAPI.init(app);
ContainerLogsAPI.init(app);
ContainerExtraDetailsApi.init(app);

app.listen(APPLICATION_PORT, () => {
    console.log(`App is running on port ${APPLICATION_PORT}. Have Fun!`);
});


