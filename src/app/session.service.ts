import { Injectable } from '@angular/core';
import { HttpTest, Data } from './data';
import { BehaviorSubject } from 'rxjs';
import { Storage } from './storage';
import { isArray } from 'util';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public tests$ = new BehaviorSubject<HttpTest[]>([]);
  /*private data: Data = {
    version: 1,
    tests: [],
  }*/

  constructor() {
    console.log('constructor');
    let data: Data = Storage.get<Data>(Storage.KEY_TESTS, null);
    if (data) {
      if (data.version == environment.version) {
        if (data.tests) {
          if (isArray(data.tests)) {
            // TODO typecheck httpTests
            this.tests$.next(data.tests);
          }
        }
      }
    }
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
      tests: tests
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
      tests: this.tests$.getValue()
    };
  
    var blob = new Blob([ encode(JSON.stringify(data, null, 4)) ], {
      type: 'application/octet-stream'
    });

    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.json');
    link.click();
  }
}
