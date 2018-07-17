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
}
