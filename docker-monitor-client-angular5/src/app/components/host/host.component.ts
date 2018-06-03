import swal from 'sweetalert2';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {HostData} from '../../interfaces/host/host-data';
import {ContainerActionData} from '../../interfaces/container/container-action-data';
import {SelectedContainer} from '../../interfaces/container/selected-container';
import {Container} from '../../interfaces/container/container';
import {addTag} from "../../interfaces/add-tag/add-tag";

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
  @Output() addTagEmitter: EventEmitter<addTag>;
  isEditTag: boolean;

  constructor() {
    this.containerAction = new EventEmitter<ContainerActionData>();
    this.selectContainer = new EventEmitter<SelectedContainer>();
    this.removeHostAction = new EventEmitter<string>();
    this.addTagEmitter = new EventEmitter<addTag>();
    this.isEditTag = false;
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

  enterEditTag(): void {
    this.isEditTag = true;
  }

  addTagAction(tagName: string): void {
    this.isEditTag = false;

    if (tagName && tagName !== "") {
      let tag: addTag = {
        tagName: tagName,
        nickName: this.host.nickname,
        hostName: this.host.name
      };
      this.addTagEmitter.emit(tag);
    }
  }

  removeHost(hostName: string): void {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, deleteHost it!'
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
