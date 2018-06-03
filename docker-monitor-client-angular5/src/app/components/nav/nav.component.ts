import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  text: string;
  filterTags: string[] = [];
  @Output() searchTextChanged: EventEmitter<string>;
  @Output() tagsToFilter: EventEmitter<string[]>;
  @Input() tags: string[];

  constructor() {
    this.searchTextChanged = new EventEmitter<string>();
    this.tagsToFilter = new EventEmitter<string[]>();
  }

  onTextChanged() {
    this.searchTextChanged.emit(this.text);
  }

  onclickTag(tagName: string) {
    if (!this.filterTags.includes(tagName)) {
      this.filterTags.push(tagName);
    }
    else {
      this.filterTags = this.filterTags.filter(tag => tag !== tagName);
    }

    this.tagsToFilter.emit(this.filterTags);
  }

  isChecked(tagName: string): boolean {
    debugger;
    return this.filterTags.includes(tagName);
  }
}
