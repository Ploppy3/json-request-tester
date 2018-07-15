import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Header, HttpTest } from './data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JsonComparator, JsonCmparatorObjectError } from './json-comparator';

@Injectable({
  providedIn: 'root'
})
export class TestService {

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

  public test(test: HttpTest) {
    let httpRequest: Observable<any>;
    let httpOptions = {
      headers: this.formatHeaders(test.headers)
    }
    switch (test.method) {
      case 'GET':
        httpRequest = this.httpGET(test.url, httpOptions);
        break;
      default:
        console.warn('Unsupported HTTP Method')
        break;
    }
    if (!httpRequest) return;
    //<{ response: HttpResponse<any>, errors: HttpComparatorObjectError[] }>(next);
    return httpRequest.pipe(
      map(
        res => {
          console.log('res', res);
          let errors = this.findErrors(test, res);
          let finalRes: ProcessedRequest = {
            response: res,
            errors: errors,
          };
          return finalRes;
        }
      )
    )
  }

  private httpGET(url, httpOptions) {
    httpOptions.observe = 'response'; // to get full http response
    return this._http.get(url, httpOptions).pipe(
      //catchError(this.handleError) // then handle the error
    );
  }

  /*
  private handleError(error: HttpErrorResponse) {
    console.log('handleError', error);
    return throwError('Something bad happened; please try again later.');
  };
  //*/

  private formatHeaders(headers: Header[]) {
    let httpHeaders = new HttpHeaders();
    headers.forEach(header => {
      httpHeaders = httpHeaders.set(header.key, header.value);
    });
    return httpHeaders;
  }

  public findErrors(test: HttpTest, response: HttpResponse<any>): JsonCmparatorObjectError[] {

    console.log('fingind errors by comparing', test, response);

    let errors: JsonCmparatorObjectError[] = [];
    let expected;

    try {
      expected = JSON.parse(test.expectedResponse.body);
    } catch (error) { }

    if (!expected) { console.warn('could not parse expected response json'); return; }

    if (test.expectedResponse.status != response.status) {
      console.log('different status');
    }
    errors = JsonComparator.compareObjects(expected, response.body || response['error'] /* fallback when HttpErrorResponse */);
    console.log('errors', errors);
    return errors;
  }
}

export interface ProcessedRequest {
  response: HttpResponse<any>,
  errors: JsonCmparatorObjectError[],
}