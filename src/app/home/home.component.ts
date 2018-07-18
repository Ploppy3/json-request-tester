import { Component, OnInit, NgZone } from '@angular/core';
import { TestService } from '../test.service';
import { HttpTest } from '../data';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-tester',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public tests = [
    /*
    <HttpTest>{
      body: null,
      headers: [],
      method: 'GET',
      expectedResponse: {
        body: {
          'data': '%anything%',
          "total_pages": "%any_number%",
          "per_page": "%any_number%",
          "page": 2,
          "total": "%any_number%"
        },
        status: 200,
      },
      url: 'https://reqres.in/api/users?page=2',
    },
    //*/
    /*
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
    //*/
  ]

  constructor(
    public sessionsService: SessionService,
    private testService: TestService,
    private zone: NgZone,
  ) { }

  ngOnInit(): void {
    this.sessionsService.tests$.subscribe(tests => {
      this.tests = tests;
    })
  }

  public removeTest(test: HttpTest) {
    let i = this.tests.indexOf(test);
    if (i > -1) {
      this.tests.splice(i, 1);
    }
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

  public trackByFn(i, test: HttpTest) {
    return i;
  }
}
