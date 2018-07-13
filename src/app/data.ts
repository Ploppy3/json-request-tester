export interface Data {
  version: number;
  data: Request[];
}

export interface Request{
  url: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  header: Header[];
  body: any;
  response: {
    text: string;
    status: number;
  }
}

export interface Header{
  key: string;
  value: string;
}