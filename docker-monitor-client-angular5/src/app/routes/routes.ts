import {HostsComponent} from '../components/hosts/hosts.component';
import {NewHostComponent} from '../components/new-host/new-host.component';
import {SelectedContainerComponent} from '../components/selected-container/selected-container.component';

export const APP_ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    component: HostsComponent
  },
  {
    path: 'selectedContainer/:host/:id',
    component: SelectedContainerComponent
  },
  {
    path: 'newHost',
    component: NewHostComponent
  }
];
