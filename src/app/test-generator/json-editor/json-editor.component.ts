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
    this.init();
  }

  public init() {
    this.PROPERTY_TYPES = Object.keys(this.PROPERTY_TYPES_ENUM).filter(key => isNaN(Number(key)));
    this.key_value_pairs = [];
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
    //console.log(this.key_value_pairs);
  }

  public removeFromObject(key: string) {
    delete this.obj[key];
    this.init();
  }

  public addToObject() {
    this.obj['newKey'] = 'a';
    this.init();
  }

  public onRenameProperty(obj: any, oldKey: string, newKey: string, property: KeyTypePair): any {
    //console.log('renaming property', oldKey, oldKey, newKey);
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
    property.key = newKey;
  }

  public onTypeChange(keyTypePair: KeyTypePair) {
    //console.log(keyTypePair.key, keyTypePair.type)
    switch (keyTypePair.type) {
      case PROPERTY_TYPES.STRING:
        this.obj[keyTypePair.key] = "a";
        break;
      case PROPERTY_TYPES.NUMBER:
        this.obj[keyTypePair.key] = 0;
        break;
      case PROPERTY_TYPES.BOOLEAN:
        this.obj[keyTypePair.key] = true;
        break;
      case PROPERTY_TYPES.ARRAY:
        this.obj[keyTypePair.key] = [];
        break;
      case PROPERTY_TYPES.OBJECT:
        this.obj[keyTypePair.key] = {};
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