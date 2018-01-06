import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {HostData} from '../../interfaces/host/host-data';
import {ContainerActionData} from '../../interfaces/container/container-action-data';
import {SelectedContainer} from '../../interfaces/container/selected-container';
import {Container} from '../../interfaces/container/container';

@Component({
  selector: 'dm-host',
  templateUrl: 'host.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HostComponent {
  @Input() host: HostData;
  @Output() containerAction: EventEmitter<ContainerActionData>;
  @Output() selectContainer: EventEmitter<SelectedContainer>;

  constructor() {
    this.containerAction = new EventEmitter<ContainerActionData>();
    this.selectContainer = new EventEmitter<SelectedContainer>();
  }

  dispatchContainerAction(containerActionData: ContainerActionData) {
    this.containerAction.emit(containerActionData);
  }

  dispatchSelectContainer(selectedContainer: SelectedContainer) {
    this.selectContainer.emit(selectedContainer);
  }

  trackByContainerId(index: number, container: Container): string {
    return container ? container.name : null;
  }
}
