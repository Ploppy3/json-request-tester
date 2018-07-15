import { Component, OnInit, NgZone } from '@angular/core';
import { TestService } from '../test.service';
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
        body: '{"data":"%anyArray%","total_pages":"%anyNumber%","per_page":"%anyNumber%","page":2,"total":"%anyNumber%"}',
        status: 200,
      },
      url: 'https://reqres.in/api/users?page=2',
    },
    <HttpTest>{
      body: null,
      headers: [],
      method: 'GET',
      expectedResponse: {
        body: '{"status":200,"description":"%anyString%","data":"%anyArray%"}',
        status: 200,
      },
      url: 'https://api.travian.engin9tools.com/api/global/servers',
    },
    <HttpTest>{
      body: null,
      headers: [],
      method: 'GET',
      expectedResponse: {
        body: '{"status": 400, "description": "pretty bad request", "message": "this route does not exist"}',
        status: 400,
      },
      url: 'https://api.travian.engin9tools.com/api/global/testststs',
    },
  ]

  constructor(
    private testService: TestService,
    private zone: NgZone,
  ) { }

  ngOnInit(): void {
  }

  public testAll() {
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
    this.testService.test(test).pipe(
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
        let errors = this.testService.findErrors(test, err);
        test.response = {
          body: err.error,
          status: err.status,
          errors: errors,
        }
      }
    );
  }

}
