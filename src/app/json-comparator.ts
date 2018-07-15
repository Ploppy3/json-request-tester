import { isArray } from "util";

export abstract class JsonComparator {

  static compareObjects(expected: any, response: any, depth?: string[]) {
    let errors: JsonCmparatorObjectError[] = [];

    console.log('expected', expected);
    console.log('got', response);

    let expectedKeys = Object.keys(expected);
    //console.log(expectedKeys);
    for (let i = 0; i < expectedKeys.length + 1; i++) {
      let key = expectedKeys[i];
    }
    Object.keys(expected).forEach(key => {
      //console.log(key, expected[key]);
      if (JSON.stringify(expected[key]) != JSON.stringify(response[key])) { // use json to compare if values are object
        console.log(expected[key], '!=', response[key]);
        if (!depth) { depth = [] }
        let error: JsonCmparatorObjectError = {
          depth: depth,
          key: key,
          type: 'DIFFERENT_VALUE',
        }
        if (expected[key] == '%any%' && !isArray(expected[key])) { // allow %any% values, also check for type array because ["%any%"] == "%any%"
          error.type = 'ALLOWED';
          console.log('allowed, %any%');
        }
        else if (expected[key] == '%anyArray%' && !isArray(expected[key])) { // allow %anyArray%
          error.type = 'ALLOWED';
          console.log('allowed, %anyArray%');
        }
        else if (expected[key] == '%anyObject%' && typeof response[key] === 'object' && !isArray(expected[key])) { // allow %anyObject%
          error.type = 'ALLOWED';
          console.log('allowed, %anyObject%');
        }
        else if (expected[key] == '%anyNumber%' && typeof response[key] === 'number' && !isArray(expected[key])) { // allow %anyNumber%
          error.type = 'ALLOWED';
          console.log('allowed, %anyNumber%');
        }
        else if (expected[key] == '%anyString%' && typeof response[key] === 'string' && !isArray(expected[key])) { // allow %anyString%
          error.type = 'ALLOWED';
          console.log('allowed, %anyString%');
        }
        else if (expected[key] == '%anyBoolean%' && typeof response[key] === 'boolean' && !isArray(expected[key])) { // allow %anyBoolean%
          error.type = 'ALLOWED';
          console.log('allowed, %anyBoolean%');
        }
        /** if both values are object, compare them */
        else if (typeof expected[key] === 'object' && typeof response[key] === 'object') {
          //error.type = 'ALLOWED';
          let newErrors = this.compareObjects(expected[key], response[key], [...depth, key]);
          //console.log('newErrors', newErrors);
          errors = errors.concat(newErrors);
        }
        /** if key missing */
        else if (!(key in response)) {
          error.type = 'MISSING_KEY';
        }
        //-------------------------------
        if (error.type != 'ALLOWED')
          errors.push(error);
      }
    })
    Object.keys(response).forEach(key => {
      let error: JsonCmparatorObjectError = {
        depth: depth,
        key: key,
        type: 'UNEXPECTED_KEY_VALUE_PAIR',
      }
      if (!(key in expected)) {
        errors.push(error);
      }
    })

    return errors;
  }
}

export interface JsonCmparatorObjectError {
  /** the depth from original object */
  depth: string[];
  key: string;
  type: 'ALLOWED' | 'MISSING_KEY' | 'DIFFERENT_VALUE' | 'UNEXPECTED_KEY_VALUE_PAIR'; // ALLOWED type is used to skip trusted fields
}