import { Component, OnInit, NgZone } from '@angular/core';
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
        body: '{"data":["%any%"],"total_pages":"%anyNumber%","per_page":"%any%","page":2,"total":"%any%"}',
        status: 200,
      },
      url: 'https://reqres.in/api/users?page=2',
    },
    <HttpTest>{
      body: null,
      headers: [],
      method: 'GET',
      expectedResponse: {
        body: '{"status":"%anyNumber%","description":"%anyString%","data":"%anyArray%"}',
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
    <HttpTest>{
      body: null,
      headers: [],
      method: 'GET',
      expectedResponse: {
        body: '{"status":200,"description":"k","data":"%any%","datas":"test"}',
        status: 200,
      },
      url: 'https://api.travian.engin9tools.com/api/global/testststs',
    },
  ]

  constructor(
    private _requestService: RequestService,
    private zone: NgZone,
  ) { }

  ngOnInit(): void {
  }

  public testAll(request: HttpTest) {
    for (let i = 0; i < this.tests.length; i++) {
      const test = this.tests[i];
      test.response = null;
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.zone.run(() => {
            this.start(test);
          })
        }, 500 * i);
      })
    }
  }

  public start(test: HttpTest) {
    test.response = null;
    this._requestService.processRequest(test).pipe(
    ).subscribe(
      res => {
        test.response = {
          body: res.response.body,
          status: res.response.status,
          errors: res.errors,
        }
      },
      err => {
        console.log('error', err)
        test.response = {
          body: err.error,
          status: err.status,
          errors: [],
        }
      }
    );
  }

}
