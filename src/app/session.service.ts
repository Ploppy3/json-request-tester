import { Injectable } from '@angular/core';
import { HttpTest, Data, GlobalVariable } from './data';
import { BehaviorSubject } from 'rxjs';
import { Storage } from './storage';
import { environment } from '../environments/environment.prod';
import { isObject, isNumber, isString, isArray } from './util';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public tests$ = new BehaviorSubject<HttpTest[]>([]);
  public globalVariables$ = new BehaviorSubject<GlobalVariable[]>([]);

  constructor(
    private logger: LoggerService,
  ) {
    logger.log('constructor SessionService');
    let data: Data = Storage.get<Data>(Storage.KEY_TESTS, null);
    if (data) {
      if (data.version == environment.version) {
        if (data.tests) {
          if (isArray(data.tests)) {
            // TODO typecheck httpTests
            let tests: HttpTest[] = [];
            data.tests.forEach(test => {
              if (this.typeCheckTest(test)) {
                tests.push(test);
              } else {
                logger.log('test failes typeCheck', test);
              }
            })
            this.tests$.next(tests);
          } else {
            logger.log('data.tests is not an array');
          }
        }
        this.globalVariables$.next(data.globalVariables || []);
      }
    }
  }

  private typeCheckTest(test: any): boolean {
    if (!isObject(test)) { return false; }
    if (!isNumber(test.id)) { return false; }
    if (!isString(test.url)) { return false; }
    if (!isString(test.method)) {
      return false;
    } else {
      let httpMethods = ['GET', 'POST', 'PUT', 'DELETE'];
      if (httpMethods.indexOf(test.method) == -1) { return false; }
    }
    if (!isObject(test.expectedResponse)) {
      return false;
    } else {
      if (!isObject(test.expectedResponse.body)) { return false; }
      if (!isNumber(test.expectedResponse.status)) { return false; }
      if (!isArray(test.expectedResponse.variablePaths)) { return false; }
    }
    return true;
  }

  public removeGlobalVariable(i: number) {
    let globalVariables = this.globalVariables$.value;
    globalVariables.splice(i, 1);
    this.globalVariables$.next(globalVariables);
    this.saveData(this.tests$.value);
  }

  public addGlobalVariable(name: string) {
    let globalVariables = this.globalVariables$.value;
    let globalVariable: GlobalVariable = {
      name: name,
      value: null
    }
    globalVariables.push(globalVariable);
    this.globalVariables$.next(globalVariables);
    this.saveData(this.tests$.value);
  }

  public addTest(test: HttpTest) {
    let tests = this.tests$.value;
    tests.push(test);
    this.tests$.next(tests);
    this.saveData(tests);
  }

  public saveData(tests: HttpTest[]) {
    let data: Data = {
      version: environment.version,
      tests: tests,
      globalVariables: this.globalVariables$.getValue(),
    };
    Storage.set(Storage.KEY_TESTS, data);
  }

  public exportTests() {
    let encode = function (s) {
      var out = [];
      for (var i = 0; i < s.length; i++) {
        out[i] = s.charCodeAt(i);
      }
      return new Uint8Array(out);
    }

    let data: Data = {
      version: environment.version,
      tests: this.tests$.getValue(),
      globalVariables: this.globalVariables$.getValue(),
    };

    var blob = new Blob([encode(JSON.stringify(data, null, 4))], {
      type: 'application/octet-stream'
    });

    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.json');
    link.click();
  }
}
