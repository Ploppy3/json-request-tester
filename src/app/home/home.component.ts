import { Component, OnInit, NgZone } from '@angular/core';
import { TestService } from '../test.service';
import { HttpTest } from '../data';
import { SessionService } from '../session.service';
import { fadeInOut, collapse } from '../animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInOut, collapse]
})
export class HomeComponent implements OnInit {

  public onDestroy$ = new Subject();
  public tests: HttpTest[] = [];
  public modelVariable = { key: null };
  public showVariablesEditor = false;

  constructor(
    public sessionsService: SessionService,
    private testService: TestService,
    private zone: NgZone,
    private logger: LoggerService,
  ) { }

  ngOnInit(): void {
    this.sessionsService.tests$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(tests => {
      this.tests = tests;
    });
    /*
    this.globalVariables = this.sessionsService.globalVariables$.value;
    this.sessionsService.globalVariables$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(res => {
      this.globalVariables = res;
    });
    //*/
  }

  public onSubmit_FormVariable() {
    this.sessionsService.addGlobalVariable(this.modelVariable.key);
  }

  public removeTest(test: HttpTest) {
    let i = this.tests.indexOf(test);
    if (i > -1) {
      this.tests.splice(i, 1);
    }
    this.sessionsService.saveData(this.tests);
  }

  public onTestChange() {
    this.sessionsService.saveData(this.tests);
  }

  public testAll() {
    for (let i = 0; i < this.tests.length; i++) {
      const test = this.tests[i];
      test.response = null;
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.zone.run(() => {
            this.start(test);
          })
        }, 500 * i);
      })
    }
  }

  public start(test: HttpTest) {
    test.response = null;
    this.testService.test(test, this.sessionsService.globalVariables$.value).pipe(
    ).subscribe(
      res => {
        test.response = {
          body: res.response.body,
          status: res.response.status,
          errors: res.errors,
        };
      },
      err => {
        this.logger.log(this, 'error', err)
        let comparisonResults = this.testService.findErrors(test, err, this.sessionsService.globalVariables$.value);
        this.logger.log(this, comparisonResults);
        test.response = {
          body: err.error,
          status: err.status,
          errors: comparisonResults.errors,
        };
      }
    );
  }

  public trackByFn(i, test: HttpTest) {
    return i;
  }

  public export() {
    this.sessionsService.exportTests();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
