import { HttpComparatorObjectError } from "./http-comparator";

export interface Data {
  version: number;
  data: HttpTest[];
}

export interface HttpTest{
  url: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  headers: Header[];
  body: any;
  expectedResponse: {
    body: string;
    status: number
  },
  response?: {
    body: string;
    status: number;
    errors: HttpComparatorObjectError[];
  }
}

export interface Header{
  key: string;
  value: string;
}