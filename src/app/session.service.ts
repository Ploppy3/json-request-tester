import { Injectable } from '@angular/core';
import { HttpTest, Data } from './data';
import { BehaviorSubject } from 'rxjs';
import { Storage } from './storage';
import { isArray } from 'util';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public tests$ = new BehaviorSubject<HttpTest[]>([]);
  private data: Data = {
    version: 1,
    tests: [],
  }

  constructor() {
    console.log('constructor');
    let data = Storage.get<Data>(Storage.KEY_TESTS, null);
    if (data) {
      if (data.version == 1) {
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
  }

  public saveTests(tests: HttpTest[]) {
    this.data.tests = tests;
    this.tests$.next(this.data.tests);
    Storage.set(Storage.KEY_TESTS, this.data);
  }

  public saveData(data: Data) {
    this.data = data;
    this.tests$.next(data.tests);
    Storage.set(Storage.KEY_TESTS, this.data);
  }

  public exportTests() {
    let encode = function (s) {
      var out = [];
      for (var i = 0; i < s.length; i++) {
        out[i] = s.charCodeAt(i);
      }
      return new Uint8Array(out);
    }

    var data = encode(JSON.stringify({...this.data, ...{tests: this.tests$.getValue()}}, null, 4) );
  
    var blob = new Blob([ data ], {
      type: 'application/octet-stream'
    });

    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.json');
    link.click();
  }
}
