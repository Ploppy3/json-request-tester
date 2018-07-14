import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Request } from '../data';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.scss']
})
export class TesterComponent implements OnInit {
  request: Request = {
    body: null,
    headers: [],
    method: 'GET',
    response: {
      text: '{"status":200,"description":"k","data":"%any%","datas":"test"}',
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
