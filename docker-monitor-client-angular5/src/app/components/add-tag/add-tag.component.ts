import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent {
  @Output() newTagEmitter: EventEmitter<string>;
  @Input() hostName: string;
  tagName: string;
  tagInputError = false;

  constructor() {
    this.newTagEmitter = new EventEmitter<string>();
    this.tagName = "";
  }

  private addNewTag(): void {
    this.newTagEmitter.emit(this.tagName);
  }

  private close(): void {
    this.newTagEmitter.emit("");
  }
}
