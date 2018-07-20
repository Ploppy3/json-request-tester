import { JsonComparatorError } from "./json-comparator";

export interface Data {
  version: number;
  tests: HttpTest[];
}

export interface HttpTest{
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers: HeaderTest[];
  body: any;
  expectedResponse: {
    body: {};
    status: number
  },
  response?: {
    body: string;
    status: number;
    errors: JsonComparatorError[];
  }
}

export interface HeaderTest{
  key: string;
  value: string;
}