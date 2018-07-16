import { Component, OnInit, Input, Output } from '@angular/core';
import { isArray } from 'util';

@Component({
  selector: 'app-array-editor',
  templateUrl: './array-editor.component.html',
  styleUrls: ['./array-editor.component.scss']
})
export class ArrayEditorComponent implements OnInit {

  @Input() array: any[];

  public PROPERTY_TYPES_ENUM = PROPERTY_TYPES;
  public PROPERTY_TYPES: string[] = [];
  public key_value_pairs: KeyTypePair[] = [];

  constructor() { }

  ngOnInit() {
    this.init();
  }

  public init() {
    //console.log('array', this.obj);
    this.PROPERTY_TYPES = Object.keys(this.PROPERTY_TYPES_ENUM).filter(key => isNaN(Number(key)));
    this.key_value_pairs = [];
    if (this.array) {
      if (isArray(this.array)) {
        for (let i = 0; i < this.array.length; i++) {
          const element = this.array[i];
          this.key_value_pairs.push({
            key: i,
            type: getPropertyType(this.array[i]),
          });
        }
      }
    }
    //console.log(this.key_value_pairs);
  }

  public removeFromArray(index: number) {
    this.array.splice(index, 1);
    this.init();
  }

  public addToArray() {
    this.array.push('a');
    this.init();
  }

  public onTypeChange(keyTypePair: KeyTypePair) {
    //console.log(keyTypePair.key, keyTypePair.type)
    switch (keyTypePair.type) {
      case PROPERTY_TYPES.STRING:
        this.array[keyTypePair.key] = "a";
        break;
      case PROPERTY_TYPES.NUMBER:
        this.array[keyTypePair.key] = 0;
        break;
      case PROPERTY_TYPES.BOOLEAN:
        this.array[keyTypePair.key] = true;
        break;
      case PROPERTY_TYPES.ARRAY:
        this.array[keyTypePair.key] = [];
        break;
      case PROPERTY_TYPES.OBJECT:
        this.array[keyTypePair.key] = {};
        break;

      default:
        break;
    }
  }

  public trackByFn(i, keyTypePair: KeyTypePair) {
    return i;
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