import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { collapse } from '../animations';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss'],
  animations: [collapse]
})
export class JsonEditorComponent implements OnInit, OnChanges {

  @Input() obj;
  @Output() objChange = new EventEmitter<{}>();
  public copyOfObj;

  constructor(
    private logger: LoggerService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['obj']) {
      this.logger.log('creating copy of obj');
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
