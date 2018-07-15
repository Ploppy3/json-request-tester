import { Component, OnInit, Input } from '@angular/core';
import { isArray } from 'util';

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss']
})
export class JsonEditorComponent implements OnInit {

  @Input() obj;

  public PROPERTY_TYPES_ENUM = PROPERTY_TYPES;
  public PROPERTY_TYPES: string[] = [];
  public key_value_pairs: KeyTypePair[] = [];

  constructor() { }

  ngOnInit() {
    this.PROPERTY_TYPES = Object.keys(this.PROPERTY_TYPES_ENUM).filter(key => isNaN(Number(key)));
    if (this.obj) {
      if (typeof this.obj == 'object') {
        Object.keys(this.obj).forEach(key => {
          this.key_value_pairs.push({
            key: key,
            type: getPropertyType(this.obj[key]),
          });
        });
      }
    }
    console.log(this.key_value_pairs);
  }

  public renameProperty(obj: any, oldKey: string, newKey: string, property: KeyTypePair): any {
    console.log('renaming property', oldKey, oldKey, newKey);
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
    property.key = newKey;
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
  key: string;
  type: PROPERTY_TYPES;
}

enum PROPERTY_TYPES {
  STRING,
  NUMBER,
  BOOLEAN,
  ARRAY,
  OBJECT,
} 