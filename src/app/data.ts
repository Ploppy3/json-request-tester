import { JsonCmparatorObjectError } from "./json-comparator";

export interface Data {
  version: number;
  data: HttpTest[];
}

export interface HttpTest{
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers: Header[];
  body: any;
  expectedResponse: {
    body: string;
    status: number
  },
  response?: {
    body: string;
    status: number;
    errors: JsonCmparatorObjectError[];
  }
}

export interface Header{
  key: string;
  value: string;
}