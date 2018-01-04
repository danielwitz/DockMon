import {ContainerLogsComponent} from '../components/container-logs/container-logs.component';
import {HostsComponent} from '../components/hosts/hosts.component';

export const APP_ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    component: HostsComponent
  },
  {
    path: 'logs/:host/:id',
    component: ContainerLogsComponent
  }
];
