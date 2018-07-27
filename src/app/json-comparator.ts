import { isArray, isNullOrUndefined, isObject, isNumber, isBoolean, isString } from "./util";
import { GlobalVariable } from "./data";

export abstract class JsonComparator {

  static compareObjects(expected: any, response: any, globalVariables: GlobalVariable[], depth?: string[]): JsonComparisonResult {
    //let errors: JsonComparatorError[] = [];

    let comparisonResults: JsonComparisonResult = {
      errors: [],
      variableAssignments: [],
    }

    //console.log('expected', expected);
    //console.log('got', response);

    let expectedKeys = Object.keys(expected);
    //console.log(expectedKeys);
    for (let i = 0; i < expectedKeys.length + 1; i++) {
      let key = expectedKeys[i];
      //console.log(key, expected[key]);
      if (JSON.stringify(expected[key]) != JSON.stringify(response[key])) { // use json to compare if values are object
        //console.log(expected[key], '!=', response[key]);
        if (!depth) { depth = [] }
        let error: JsonComparatorError = {
          depth: depth,
          key: key,
          type:  JsonComparatorErrorType.DIFFERENT_VALUE,
        }
        //--------------------------------------
        /** Assign values to global variables */
        globalVariables.forEach(variable => {
          let variableKey = '/set@' + variable.name + '/';
          if (expected[key] == variableKey) {
            variable.value = response[key];
            //console.log(variableKey, '-set-', response[key]);
            error.type = JsonComparatorErrorType.ALLOWED;
          }
        });
        //--------------------------------------
        if (expected[key] == '%anything%' && !isArray(expected[key]) && !isNullOrUndefined(response[key])) {
          // allow %any% values, also check for type array because ["%any%"] == "%any%"
          error.type = JsonComparatorErrorType.ALLOWED;
          //console.log('allowed, %anything%');
        }
        else if (expected[key] == '%any_array%' && isArray(response[key])) { // allow %anyArray%
          error.type = JsonComparatorErrorType.ALLOWED;
          //console.log('allowed, %any_array%');
        }
        else if (expected[key] == '%any_object%' && isObject(response[key]) && !isArray(response[key])) { // allow %anyObject%
          error.type = JsonComparatorErrorType.ALLOWED;
          //console.log('allowed, %any_object%');
        }
        else if (expected[key] == '%any_number%' && isNumber(response[key]) && !isArray(response[key])) { // allow %anyNumber%
          error.type = JsonComparatorErrorType.ALLOWED;
          //console.log('allowed, %any_number%');
        }
        else if (expected[key] == '%any_string%' && isString(response[key]) && !isArray(response[key])) { // allow %anyString%
          error.type = JsonComparatorErrorType.ALLOWED;
          //console.log('allowed, %any_string%');
        }
        else if (expected[key] == '%any_boolean%' && isBoolean(response[key]) && !isArray(response[key])) { // allow %anyBoolean%
          error.type = JsonComparatorErrorType.ALLOWED;
          //console.log('allowed, %any_boolean%');
        }
        /** if both values are object, compare them */
        else if (isObject(expected[key]) && isObject(response[key])) {
          //error.type = 'ALLOWED';
          let comparisonResults = this.compareObjects(expected[key], response[key], globalVariables, [...depth, key]);
          //console.log('newErrors', newErrors);
          comparisonResults.errors.concat(comparisonResults.errors);
          comparisonResults.variableAssignments.concat(comparisonResults.variableAssignments);
        }
        /** if key missing */
        else if (!(key in response)) {
          error.type = JsonComparatorErrorType.MISSING_KEY;;
        }
        /** global variables comparison */
        globalVariables.forEach(variable => {
          let variableKey = '/compare@' + variable.name + '/';
          if (expected[key] == variableKey) {
            //console.log(variableKey, variable.value, '-==-', key, response[key])
            if (response[key] == variable.value) {
              error.type = JsonComparatorErrorType.ALLOWED;
            }
          }
        });
        //-------------------------------
        if (error.type != JsonComparatorErrorType.ALLOWED)
          comparisonResults.errors.push(error);
      }
    }

    Object.keys(response).forEach(key => {
      let error: JsonComparatorError = {
        depth: depth,
        key: key,
        type: JsonComparatorErrorType.UNEXPECTED_KEY_VALUE_PAIR,
      }
      if (!(key in expected)) {
        comparisonResults.errors.push(error);
      }
    })

    return comparisonResults;
  }
}

export interface JsonComparatorError {
  /** the depth from original object */
  depth: string[],
  key: string,
  type: JsonComparatorErrorType,
}

export enum JsonComparatorErrorType{
  ALLOWED,
  MISSING_KEY,
  DIFFERENT_VALUE,
  UNEXPECTED_KEY_VALUE_PAIR,
}

export interface VariableAssignement{
  variableKey: string,
  value: any,
}

export interface JsonComparisonResult{
  errors: JsonComparatorError[],
  variableAssignments: VariableAssignement[],
}