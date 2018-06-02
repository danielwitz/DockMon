import {Component, Input} from '@angular/core';
import {Details} from '../../interfaces/details/details';

@Component({
  selector: 'dm-container-details',
  templateUrl: 'container-details.component.html'
})
export class ContainerDetailsComponent {
  @Input() details: Details;

  constructor() {
  }
}
