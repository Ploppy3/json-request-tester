import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Header, Request } from './data';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private _http: HttpClient) { }

  public processRequest(request: Request) {
    let httpRequest;
    let httpOptions = {
      headers: this.formatHeaders(request.headers)
    }
    switch (request.method) {
      case 'GET':
        httpRequest = this.get(request.url, httpOptions);
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

  private get(url, httpOptions = {}) {
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

  private testResponse(request: Request, response: any) {
    let expected;
    try {
      expected = JSON.parse(request.response.text);
    } catch (error) { }

    if (!expected) { console.warn('could not parse expected response json'); return; }

    let errors = this.compareObjects('>', expected, response);
    console.log(errors);
  }

  private compareObjects(depth: string, expected: any, response: any) {
    let errors: ErrorComparison[] = [];

    console.log('expected', expected);
    console.log('got', response);
    
    let expectedKeys = Object.keys(expected);
    //console.log(expectedKeys);
    for (let i = 0; i < expectedKeys.length + 1; i++) {
      let key = expectedKeys[i];
    }
    Object.keys(expected).forEach(key => {
      //console.log(key, expected[key]);
      if (expected[key] != response[key]) {
        let error: ErrorComparison = {
          depth: depth,
          key: key,
          type: 'DIFFERENT_VALUE',
        }
        /** allow %any% values */
        if (expected[key] == '%any%') {
          error.type = 'ALLOWED';
        }
        /** if both values are object, compare them */
        else if (typeof expected[key] === 'object' && typeof response[key] === 'object') {
          let newErrors = this.compareObjects(depth + key + '>', expected.key, response[key]);
          errors.concat(newErrors);
        }
        /** if key missing */
        else if (!(key in response)) {
          error.type = 'MISSING_KEY';
        }
        //-------------------------------
        if (error.type != 'ALLOWED')
          errors.push(error);
      }
    })

    return errors;
  }

  private handleError(error: HttpErrorResponse) {
    console.log('handleError', error);
    return throwError('Something bad happened; please try again later.');
  };
}

interface ErrorComparison {
  /** the depth from original object */
  depth: string;
  key: string;
  type: 'ALLOWED' | 'MISSING_KEY' | 'DIFFERENT_VALUE';
}