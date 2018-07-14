import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpEvent } from '@angular/common/http';
import { Header, HttpTest } from './data';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpComparator, HttpComparatorObjectError } from './http-comparator';

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
    let httpRequest: Observable<any>;
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
    //<{ response: HttpResponse<any>, errors: HttpComparatorObjectError[] }>(next);
    return httpRequest.pipe(
      map(res => {
        let errors = this.findErrors(request, res);
        let finalRes: ProcessedRequest = {
          response: res,
          errors: errors,
        };
        return finalRes;
      })
    )
  }

  private httpGET(url, httpOptions) {
    httpOptions.observe = 'response'; // to get full http response
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

  private findErrors(request: HttpTest, response: HttpResponse<any>): HttpComparatorObjectError[] {
    let errors: HttpComparatorObjectError[] = [];
    let expected;

    try {
      expected = JSON.parse(request.expectedResponse.body);
    } catch (error) { }

    if (!expected) { console.warn('could not parse expected response json'); return; }
    
    if (request.expectedResponse.status != response.status) {
      console.log('different status');
    }
    errors = HttpComparator.compareObjects(expected, response.body);
    console.log('errors', errors);
    return errors;
  }

  

  private handleError(error: HttpErrorResponse) {
    console.log('handleError', error);
    return throwError('Something bad happened; please try again later.');
  };
}

export interface ProcessedRequest{
  response: HttpResponse<any>,
  errors: HttpComparatorObjectError[],
}