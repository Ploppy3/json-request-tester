import { JsonComparatorError } from "./json-comparator";

export interface Data {
  version: number;
  tests: HttpTest[];
  globalVariables: GlobalVariable[];
}

export interface HttpTest{
  id: number;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers: HeaderTest[];
  body: any;
  expectedResponse: {
    body: {};
    status: number;
    variablePaths: VariablePath[];
  },
  response?: {
    body: string;
    status: number;
    errors: JsonComparatorError[];
  },
}

export interface HeaderTest{
  key: string;
  value: string;
}

export interface GlobalVariable{
  /** the visible name of the variable, to be user-friendly */
  name: string;
  value: any;
}

export interface VariablePath{
  /** the key of the GlobalVariable */
  key: string;
  path: string[];
}