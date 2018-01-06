import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Container} from '../../interfaces/container/container';
import {CONTAINER_ACTIONS} from 'app/reducers/actions';
import {ContainerActionData} from '../../interfaces/container/container-action-data';
import {SelectedContainer} from '../../interfaces/container/selected-container';

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

  constructor() {
    this.containerAction = new EventEmitter<ContainerActionData>();
    this.selectContainer = new EventEmitter<SelectedContainer>()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isStatusChanged(changes['container'].previousValue,
        changes['container'].currentValue)) {
      this.waitingForAction = false;
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
