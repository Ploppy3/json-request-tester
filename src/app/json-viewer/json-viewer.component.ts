import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.scss']
})
export class JsonViewerComponent implements OnInit, OnChanges {

  @Input() obj: {};
  @Output() change = new EventEmitter<void>();
  public copyOfObj: {};

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['obj']) {
      console.log('creating copy of obj');
      this.copyOfObj = Object.assign({}, this.obj);
    }
  }
  
  public onCopyChange() {
    console.log('copy change detected');
    //this.obj = this.copyOfObj;
    this.change.emit();
  }

  public saveChanges() {
    this.obj = Object.assign({}, this.copyOfObj);
  }

  public discardChanges() {
    this.copyOfObj = Object.assign({}, this.obj);
  }

}
