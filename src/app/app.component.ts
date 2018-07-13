import { Component, OnInit } from '@angular/core';
import { Request } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
    this.test();
  }

  public test() {
    let request: Request = {
      body: null,
      headers: [{
        key: 'key',
        value: 'value',
      }],
      method: 'GET',
      response: {
        text: '{"status":200,"description":"ok"}',
        status: 200,
      },
      url: 'https://api.travian.engin9tools.com/api/global/servers',
    }
    //send request to service
  }
}
