import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { HttpTest } from '../data';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.scss']
})
export class TesterComponent implements OnInit {

  public tests = [
    <HttpTest>{
      body: null,
      headers: [],
      method: 'GET',
      expectedResponse: {
        body: '{"status":200,"description":"ok","data":"%any%"}',
        status: 200,
      },
      url: 'https://api.travian.engin9tools.com/api/global/servers',
    },
    <HttpTest>{
      body: null,
      headers: [],
      method: 'GET',
      expectedResponse: {
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

  public test(request: HttpTest) {
    this._requestService.processRequest(this.tests[1]).subscribe(res => console.log(res))
  }

  public start(test: HttpTest) {
    test.response = null;
    this._requestService.processRequest(test).subscribe(res => {
      test.response = { 
        body: res.response.body,
        status: res.response.status,
        errors: res.errors,
      };
    });
  }

}
