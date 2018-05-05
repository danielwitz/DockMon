import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  text: string;
  @Output() searchTextChanged: EventEmitter<string>;

  constructor() {
    this.searchTextChanged = new EventEmitter<string>();
  }

  onTextChanged(){
    this.searchTextChanged.emit(this.text);
  }
}
