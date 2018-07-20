import { Component, OnInit } from '@angular/core';
import { HttpTest } from '../data';
import { SessionService } from '../session.service';
import { HttpClient } from '@angular/common/http';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

@Component({
  selector: 'app-test-generator',
  templateUrl: './test-generator.component.html',
  styleUrls: ['./test-generator.component.scss']
})
export class TestGeneratorComponent implements OnInit {
  
  //public response = {};
  
  public model: HttpTest = {
    body: null,
    expectedResponse: {
      body: {},
      status: 200,
    },
    headers: [],
    method: 'GET',
    url: 'https://api.travian.engin9tools.com/api/global/servers',
  }

  /*
  public formTest = new FormGroup({
    url: new FormControl('https://api.travian.engin9tools.com/api/global/servers'),
    method: new FormControl('GET'),
    status: new FormControl(200),
    headers: new FormGroup({ a: new FormControl('test')})
  })
  //*/

  constructor(
    private sessionService: SessionService,
    private httpClient: HttpClient,
  ) { }

  ngOnInit() {

  }

  public createTestFromUrl() {
    switch (this.model.method) {
      case 'GET':
        this.httpClient.get(this.model.url).pipe(
        ).subscribe(res => {
          if (typeof res == 'object') {
            this.model.expectedResponse.body = res;
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

  public removeHeader(i: number) {
    this.model.headers.slice(i, 1);
  }

  public onSubmit(event: any) {
    console.log(this.model);
    //this.sessionService.addTest(this.model);
    this.sessionService.addTest(JSON.parse(JSON.stringify(this.model)));
  }

}