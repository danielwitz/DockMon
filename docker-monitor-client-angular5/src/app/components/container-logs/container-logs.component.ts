import {Component, Input} from '@angular/core';
import {Log} from '../../interfaces/log/log';

@Component({
  selector: 'dm-container-logs',
  templateUrl: 'container-logs.component.html'
})
export class ContainerLogsComponent {
  @Input() logs: Log[];

  constructor() {
  }
}
