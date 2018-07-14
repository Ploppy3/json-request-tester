import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Request } from '../data';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.scss']
})
export class TesterComponent implements OnInit {

  public requests = [
    <Request>{
      body: null,
      headers: [],
      method: 'GET',
      response: {
        body: '{"status":200,"description":"ok","data":"%any%"}',
        status: 200,
      },
      url: 'https://api.travian.engin9tools.com/api/global/servers',
    },
    <Request>{
      body: null,
      headers: [],
      method: 'GET',
      response: {
        body: '{"status":200,"description":"k","data":"%any%","datas":"test"}',
        status: 200,
      },
      url: 'https://api.travian.engin9tools.com/api/global/servers',
    },
  ]

  constructor(
    private _requestService: RequestService,
  ) { }

  ngOnInit(): void {
  }

  public test() {
    this._requestService.processRequest(this.requests[0]);
  }

}
