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

  constructor() {
    console.log('constructor');
    let data = Storage.get<Data>(Storage.KEY_TESTS, null);
    if (data) {
      if (data.tests) {
        if (isArray(typeof data.tests)) {
          // TODO typecheck httpTests
          this.tests$.next(data.tests);
        }
      }
    }
  }

  public addTest(test: HttpTest) {
    let tests = this.tests$.value;
    tests.push(test);
    this.tests$.next(tests);
  }
}
