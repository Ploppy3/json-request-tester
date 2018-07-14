import { Component, OnInit } from '@angular/core';
import { Request } from './data';
import { RequestService } from './request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  request: Request = {
    body: null,
    headers: [],
    method: 'GET',
    response: {
      text: '{"status":200,"description":"ok"}',
      status: 200,
    },
    url: 'https://api.travian.engin9tools.com/api/global/servers',
  }

  constructor(
    private _requestService: RequestService,
  ) { }

  ngOnInit(): void {
    //this.test();
  }

  public test() {
    
    this._requestService.processRequest(this.request);
  }
}
