import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Header, HttpTest } from './data';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpComparator } from './http-comparator';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private _http: HttpClient) {
    /*
    let expected = {
      status: 'ok',
      customObject: {
        myKey: 'myVal',
        param: 'test'
      }
    };
    let response = {
      status: 'not ok',
      customObject: {
        myKey: 'myValu',
      }
    };
    let errors = this.compareObjects(expected, response);
    console.log('errors', errors);
    //*/
  }

  public processRequest(request: HttpTest) {
    let httpRequest;
    let httpOptions = {
      headers: this.formatHeaders(request.headers)
    }
    switch (request.method) {
      case 'GET':
        httpRequest = this.httpGET(request.url, httpOptions);
        break;
      default:
        console.warn('Unsupported HTTP Method')
        break;
    }
    if (!httpRequest) return;
    httpRequest.subscribe(
      response => {
        //console.log(res);
        this.testResponse(request, response);
      },
      error => {
        console.log('error', error);
      }
    );
  }

  private httpGET(url, httpOptions) {
    httpOptions.observe = 'response';
    return this._http.get(url, httpOptions).pipe(
      catchError(this.handleError) // then handle the error
    );
  }

  private formatHeaders(headers: Header[]) {
    let httpHeaders = new HttpHeaders();
    headers.forEach(header => {
      httpHeaders = httpHeaders.set(header.key, header.value);
    });
    return httpHeaders;
  }

  private testResponse(request: HttpTest, response: HttpResponse<any>) {
    let expected;

    try {
      expected = JSON.parse(request.expectedResponse.body);
    } catch (error) { }

    if (!expected) { console.warn('could not parse expected response json'); return; }
    
    if (request.expectedResponse.status != response.status) {
      console.log('different status');
    }
    let errors = HttpComparator.compareObjects(expected, response.body);
    console.log('errors', errors);
  }

  

  private handleError(error: HttpErrorResponse) {
    console.log('handleError', error);
    return throwError('Something bad happened; please try again later.');
  };
}