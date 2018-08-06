import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpTest } from '../data';
import { JsonComparatorErrorType } from '../json-comparator';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-test-card',
  templateUrl: './test-card.component.html',
  styleUrls: ['./test-card.component.scss'],
})
export class TestCardComponent implements OnInit {

  @Input() test: HttpTest;
  @Input() result: any;
  @Output() onChange = new EventEmitter<void>();

  public errorTypes = JsonComparatorErrorType;

  constructor(
    private logger: LoggerService,
  ) { }

  ngOnInit() {

  }

  public trackByFn(i, test: HttpTest) {
    return i;
  }
}
