import { Component, OnInit } from '@angular/core';
import { HttpTest } from '../data';
import { SessionService } from '../session.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test-generator',
  templateUrl: './test-generator.component.html',
  styleUrls: ['./test-generator.component.scss']
})
export class TestGeneratorComponent implements OnInit {

  //public response = {};

  public model: HttpTest = {
    id: -1,
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
    let request: Observable<HttpResponse<object>>;
    switch (this.model.method) {
      case 'GET':
        request = this.httpClient.get(this.model.url, { observe: 'response' });
        break;
      case 'POST':
        request = this.httpClient.post(this.model.url, this.model.body, { observe: 'response' });
        break;
      case 'PUT':
        request = this.httpClient.put(this.model.url, this.model.body, { observe: 'response' });
        break;
      case 'DELETE':
        request = this.httpClient.delete(this.model.url, { observe: 'response' });
        break;

      default:
        break;
    }
    if (!request) return;
    request.pipe(
    ).subscribe(
      res => {
        //console.log(res);
        this.model.expectedResponse.status = res.status;
        this.model.expectedResponse.body = res.body;
      },
      err => {
        //console.log(err);
        this.model.expectedResponse.status = err.status;
        this.model.expectedResponse.body = typeof err.error == 'object' ? err.error : {};
      }
    );
  }

  public onSubmit(event: any) {
    console.log(this.model);
    this.model.id = new Date().getTime();
    //this.sessionService.addTest(this.model);
    this.sessionService.addTest(JSON.parse(JSON.stringify(this.model)));
  }

  public trackByFn(i, test: HttpTest) {
    return i;
  }

}