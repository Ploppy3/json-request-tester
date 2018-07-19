import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpTest } from '../data';
import { SessionService } from '../session.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-generator',
  templateUrl: './test-generator.component.html',
  styleUrls: ['./test-generator.component.scss']
})
export class TestGeneratorComponent implements OnInit {

  public formVisible = false;

  public testObj = {};
  /*
  public testObj = {
    "status": 200,
    "description": "%any_string%",
    "data": "%any_array%"
  }
  //*/

  public formTest = new FormGroup({
    url: new FormControl('https://api.travian.engin9tools.com/api/global/servers'),
    method: new FormControl('GET'),
    status: new FormControl(200),
  })

  constructor(
    private sessionService: SessionService,
    private httpClient: HttpClient,
  ) { }

  ngOnInit() {

  }

  public createTestFromUrl() {
    switch (this.formTest.controls['method'].value) {
      case 'GET':
        this.httpClient.get(this.formTest.controls['url'].value).pipe(
        ).subscribe(res => {
          if (typeof res == 'object') {
            this.testObj = res;
          }
        });
        break;
      case 'POST':

        break;
      case 'PUT':
        
        break;
      case 'DELETE':

        break;

      default:
        break;
    }
  }

  public onSubmit(event: any) {
    let test: HttpTest = {
      body: null,
      expectedResponse: {
        body: JSON.parse(JSON.stringify(this.testObj)), // create a copy to prevent back-propagation of changes
        status: this.formTest.controls['status'].value,
      },
      headers: [],
      method: this.formTest.controls['method'].value,
      url: this.formTest.controls['url'].value,
    }
    this.sessionService.addTest(test);
  }

}