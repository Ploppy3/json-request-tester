import { Component, OnInit, Input } from '@angular/core';
import { isArray } from 'util';

@Component({
  selector: 'app-array-editor',
  templateUrl: './array-editor.component.html',
  styleUrls: ['./array-editor.component.scss']
})
export class ArrayEditorComponent implements OnInit {

  @Input() obj: any[];

  public PROPERTY_TYPES_ENUM = PROPERTY_TYPES;
  public PROPERTY_TYPES: string[] = [];
  public key_value_pairs: KeyTypePair[] = [];

  constructor() { }

  ngOnInit() {
    //console.log('array', this.obj);
    this.PROPERTY_TYPES = Object.keys(this.PROPERTY_TYPES_ENUM).filter(key => isNaN(Number(key)));
    if (this.obj) {
      if (isArray(this.obj)) {
        for (let i = 0; i < this.obj.length; i++) {
          const element = this.obj[i];
          this.key_value_pairs.push({
            key: i,
            type: getPropertyType(this.obj[i]),
          });
        }
      }
    }
    //console.log(this.key_value_pairs);
  }

}

function getPropertyType(property: any): PROPERTY_TYPES {
  if (isArray(property)) {
    return PROPERTY_TYPES.ARRAY;
  } else if (typeof property == 'string') {
    return PROPERTY_TYPES.STRING;
  } else if (typeof property == 'number') {
    return PROPERTY_TYPES.NUMBER;
  } else if (typeof property == 'boolean') {
    return PROPERTY_TYPES.BOOLEAN;
  } else if (typeof property == 'object') {
    return PROPERTY_TYPES.OBJECT;
  }
}

interface KeyTypePair {
  key: number;
  type: PROPERTY_TYPES;
}

enum PROPERTY_TYPES {
  STRING,
  NUMBER,
  BOOLEAN,
  ARRAY,
  OBJECT,
} 