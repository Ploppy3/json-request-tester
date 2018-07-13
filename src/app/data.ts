export interface Data {
  version: number;
  data: Request[];
}

export interface Request{
  url: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  header: { key: string, value: string }[];
  body: any;
  response: {
    text: string;
    status: number;
  }
}
