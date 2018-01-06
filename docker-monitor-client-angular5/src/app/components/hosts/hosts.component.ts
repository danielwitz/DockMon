import {Component} from '@angular/core';
import {ContainersStatsService} from '../../services/container/container-stats.service';
import {HostData} from '../../interfaces/host/host-data';
import {AppState} from '../../interfaces/state/app-state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {ContainerActionData} from '../../interfaces/container/container-action-data';
import {ContainersActionsService} from '../../services/container/container-actions.service';
import {Router} from '@angular/router';
import {SelectedContainer} from '../../interfaces/container/selected-container';
import {SelectContainerService} from '../../services/container/select-container.service';

@Component({
  selector: 'dm-hosts',
  templateUrl: 'hosts.component.html'
})
export class HostsComponent {
  hosts: Observable<HostData[]>;

  constructor(private containersStatsService: ContainersStatsService,
              private containersActionService: ContainersActionsService,
              private selectContainerService: SelectContainerService,
              private store: Store<AppState>,
              private router: Router) {
    this.hosts = this.store.select<HostData[]>((state: AppState) => state.hosts);
  }

  onContainerAction(containerActionData: ContainerActionData) {
    this.containersActionService.doAction(containerActionData.action,
      containerActionData.hostName, containerActionData.id);
  }

  selectContainer(containerToSelect: SelectedContainer) {
    this.selectContainerService.selectContainer(containerToSelect)
    this.router.navigate(['/logs', containerToSelect.hostName, containerToSelect.id]);
  }

  trackByHostName(index: number, host: HostData): string {
    return host ? host.name : undefined;
  }
}
