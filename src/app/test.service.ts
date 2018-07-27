import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HeaderTest, HttpTest, GlobalVariable } from './data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JsonComparator, JsonComparatorError, JsonComparisonResult } from './json-comparator';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(
    private _http: HttpClient,
    private logger: LoggerService,
  ) {
    logger.log('constructor SessionService');
  }

  public test(test: HttpTest, globalVariables: GlobalVariable[]) {
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
    return httpRequest.pipe(
      map(
        res => {
          //console.log('res', res);
          let comparisonResults = this.findErrors(test, res, globalVariables);
          let finalRes: ProcessedRequest = {
            response: res,
            errors: comparisonResults.errors,
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

  private formatHeaders(headers: HeaderTest[]) {
    let httpHeaders = new HttpHeaders();
    headers.forEach(header => {
      httpHeaders = httpHeaders.set(header.key, header.value);
      //console.log('setting an header');
    });
    return httpHeaders;
  }

  public findErrors(test: HttpTest, response: HttpResponse<any>, globalVariables: GlobalVariable[]): JsonComparisonResult {
    //console.log('fingind errors by comparing', test, response);
    let expected = test.expectedResponse.body;
    if (test.expectedResponse.status != response.status) {
      //console.log('different status');
    }
    let res = JsonComparator.compareObjects(expected, response.body || response['error'] /* fallback when HttpErrorResponse */, globalVariables);
    //console.log('errors', errors);
    return res;
  }
}

export interface ProcessedRequest {
  response: HttpResponse<any>,
  errors: JsonComparatorError[],
}