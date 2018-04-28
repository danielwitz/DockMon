import {ContainerLogsComponent} from '../components/container-logs/container-logs.component';
import {HostsComponent} from '../components/hosts/hosts.component';
import {NewHostComponent} from "../components/new-host/new-host.component";

export const APP_ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    component: HostsComponent
  },
  {
    path: 'logs/:host/:id',
    component: ContainerLogsComponent
  },
  {
    path: 'newHost',
    component: NewHostComponent
  }
];
