import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { isArray } from 'util';
import { PROPERTY_TYPES, SPECIAL_TYPES, getPropertyType } from '../json-editor/json-editor.component';

@Component({
  selector: 'app-array-editor',
  templateUrl: './array-editor.component.html',
  styleUrls: ['./array-editor.component.scss']
})
export class ArrayEditorComponent implements OnInit, OnChanges {

  @Input() array: any[];

  public getPropertyTypes = getPropertyType;
  public readonly SPECIAL_TYPES = SPECIAL_TYPES;
  public readonly PROPERTY_TYPES_ENUM = PROPERTY_TYPES;
  public PROPERTY_TYPES: string[] = [];
  public key_value_pairs: ArrayKeyTypePair[] = [];

  constructor() { }

  ngOnInit() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['array']) {
      this.init();
    }
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

  public onTypeChange(keyTypePair: ArrayKeyTypePair) {
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
      case PROPERTY_TYPES.SPECIAL:
        this.array[keyTypePair.key] = SPECIAL_TYPES[0].value;
        break;

      default:
        break;
    }
  }

  public trackByFn(i, keyTypePair: ArrayKeyTypePair) {
    return i;
  }
}

/*
function getPropertyType(property: any): PROPERTY_TYPES {
  if (isArray(property)) {
    return PROPERTY_TYPES.ARRAY;
  } else if (typeof property == 'string') {
    for (let i = 0; i < SpecialTypes.length; i++) {
      const specialType = SpecialTypes[i];
      if (property == specialType.value) {
        return PROPERTY_TYPES.SPECIAL;
      }
    }
    return PROPERTY_TYPES.STRING;
  } else if (typeof property == 'number') {
    return PROPERTY_TYPES.NUMBER;
  } else if (typeof property == 'boolean') {
    return PROPERTY_TYPES.BOOLEAN;
  } else if (typeof property == 'object') {
    return PROPERTY_TYPES.OBJECT;
  }
}
//*/

interface ArrayKeyTypePair {
  key: number;
  type: PROPERTY_TYPES;
}