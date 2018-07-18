import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { collapse } from '../animations';

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.scss'],
  animations: [collapse]
})
export class JsonViewerComponent implements OnInit, OnChanges {

  @Input() obj;
  @Output() objChange = new EventEmitter<{}>();
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
    this.objChange.emit(JSON.parse(JSON.stringify(this.obj)));
  }

  public discardChanges() {
    this.copyOfObj = JSON.parse(JSON.stringify(this.obj));
  }

}
