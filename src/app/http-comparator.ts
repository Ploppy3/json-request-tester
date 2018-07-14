export abstract class HttpComparator {

  static compareObjects(expected: any, response: any, depth?: string[]) {
    let errors: ErrorComparison[] = [];

    console.log('expected', expected);
    console.log('got', response);

    let expectedKeys = Object.keys(expected);
    //console.log(expectedKeys);
    for (let i = 0; i < expectedKeys.length + 1; i++) {
      let key = expectedKeys[i];
    }
    Object.keys(expected).forEach(key => {
      //console.log(key, expected[key]);
      if (JSON.stringify(expected[key]) != JSON.stringify(response[key])) { // using json to compare if values are object
        //console.log(expected[key], '!=', response[key]);
        if (!depth) { depth = [] }
        let error: ErrorComparison = {
          depth: depth,
          key: key,
          type: 'DIFFERENT_VALUE',
        }
        /** allow %any% values */
        if (expected[key] == '%any%') {
          error.type = 'ALLOWED';
        }
        /** if both values are object, compare them */
        else if (typeof expected[key] === 'object' && typeof response[key] === 'object') {
          error.type = 'ALLOWED';
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

    return errors;
  }
}

export interface ErrorComparison {
  /** the depth from original object */
  depth: string[];
  key: string;
  type: 'ALLOWED' | 'MISSING_KEY' | 'DIFFERENT_VALUE';
}