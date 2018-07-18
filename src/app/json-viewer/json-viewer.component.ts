import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { JsonEditorComponent } from './json-editor/json-editor.component';

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.scss']
})
export class JsonViewerComponent implements OnInit, OnChanges {

  @Input() obj;
  @Output() change = new EventEmitter<void>();
  public copyOfObj;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['obj']) {
      console.log('creating copy of obj');
      this.copyOfObj = JSON.parse(JSON.stringify(this.obj))
    }
  }

  public saveChanges() {
    this.obj = JSON.parse(JSON.stringify(this.copyOfObj));
    this.change.emit();
  }

  public discardChanges() {
    this.copyOfObj = JSON.parse(JSON.stringify(this.obj));
  }

}
