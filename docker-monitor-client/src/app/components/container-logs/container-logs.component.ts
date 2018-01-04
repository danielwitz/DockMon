import {Component} from '@angular/core';
import {Log} from '../../interfaces/log/log';
import {SelectedContainer} from '../../interfaces/container/selected-container';
import {AppState} from 'app/interfaces/state/app-state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {ContainersActionsService} from '../../services/container/container-actions.service';
import {ContainerActionData} from '../../interfaces/container/container-action-data';
import {HostData} from '../../interfaces/host/host-data';
import {Container} from '../../interfaces/container/container';

@Component({
  selector: 'dm-container-logs',
  templateUrl: 'container-logs.component.html'
})
export class ContainerLogsComponent {
  logs: Observable<Log[]>;
  selectedContainer: Container;
  hostName: string;

  constructor(private store: Store<AppState>,
              private containersActionService: ContainersActionsService) {
    this.logs = store.select<Log[]>((state: AppState) => state.containerLogs);
    Observable.combineLatest(this.store.select<HostData[]>((state: AppState) => state.hosts),
      store.select<SelectedContainer>((state: AppState) => state.selectedContainer), (hosts, selectedContainer) => {
        if (selectedContainer) {
          this.hostName = selectedContainer.hostName;
          return hosts.filter((host) => host.name === selectedContainer.hostName)[0].containers.filter((container) =>
            container.id === selectedContainer.id)[0]
        }
      }).subscribe((selectedContainer) => this.selectedContainer = selectedContainer);
  }

  onContainerAction(containerActionData: ContainerActionData) {
    this.containersActionService.doAction(containerActionData.action,
      containerActionData.hostName, containerActionData.id);
  }
}
