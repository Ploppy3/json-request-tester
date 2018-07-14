export interface Data {
  version: number;
  data: HttpTest[];
}

export interface HttpTest{
  url: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  headers: Header[];
  body: any;
  response: {
    body: string;
    status: number;
  }
}

export interface Header{
  key: string;
  value: string;
}