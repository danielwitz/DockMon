import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Container} from '../../interfaces/container/container';
import {ContainerActionData} from '../../interfaces/container/container-action-data';
import {SelectedContainer} from '../../interfaces/container/selected-container';
import {CONTAINER_ACTIONS} from '../../reducers/actions';

@Component({
  selector: 'dm-container',
  templateUrl: 'container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent implements OnChanges {
  @Input() host: string;
  @Input() container: Container;
  @Output() containerAction: EventEmitter<ContainerActionData>;
  @Output() selectContainer: EventEmitter<SelectedContainer>;
  waitingForAction: boolean;
  running: boolean;
  warning: any;

  constructor() {
    this.containerAction = new EventEmitter<ContainerActionData>();
    this.selectContainer = new EventEmitter<SelectedContainer>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let currentValue = changes['container'].currentValue;
    if (this.isStatusChanged(changes['container'].previousValue,
        currentValue)) {
      this.waitingForAction = false;
    }

    if((currentValue.maxNormalCpu <= currentValue.stats.cpu)||
      (currentValue.minNormalCpu >= currentValue.stats.cpu) ||
      (currentValue.maxNormalMemory <= currentValue.stats.memory)) {
      this.warning = true;
    } else {
      this.warning = false;
    }
  }

  restartContainer() {
    this.dispatchAction(CONTAINER_ACTIONS.restartContainer);
  }

  startContainer() {
    this.dispatchAction(CONTAINER_ACTIONS.startContainer);
  }

  stopContainer() {
    this.dispatchAction(CONTAINER_ACTIONS.stopContainer);
  }

  dispatchAction(action: string): void {
    this.waitingForAction = true;
    this.containerAction.emit({hostName: this.host, id: this.container.id, action: action});
  }

  onContainerNameClick() {
    this.selectContainer.emit({hostName: this.host, id: this.container.id});
  }

  private isStatusChanged(prev: Container, newContainer: Container): boolean {
    return (prev && newContainer) && (prev.status !== newContainer.status);
  }
}
