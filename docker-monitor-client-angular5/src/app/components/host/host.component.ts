import swal from 'sweetalert2'
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
  @Output() removeHostAction: EventEmitter<string>;

  constructor() {
    this.containerAction = new EventEmitter<ContainerActionData>();
    this.selectContainer = new EventEmitter<SelectedContainer>();
    this.removeHostAction = new EventEmitter<string>();
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

  removeHost(hostName: string): void {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.removeHostAction.emit(hostName);
        swal({
          title: 'processing...',
          timer: 5000,
          onOpen: () => {
            swal.showLoading()
          }
        }).then(() => {
          swal(
            'Deleted!',
            'Your host has been deleted.',
            'success'
          )
        });
      }
    });
  }
}
