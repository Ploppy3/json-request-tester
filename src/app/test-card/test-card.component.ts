import { Component, Input, OnInit } from '@angular/core';
import { HttpTest } from '../data';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test-card',
  templateUrl: './test-card.component.html',
  styleUrls: ['./test-card.component.scss']
})
export class TestCardComponent implements OnInit {
  @Input() test: HttpTest;
  @Input() result: any;
  
  constructor(
    private requestService: TestService
  ) { }

  ngOnInit() {

  }

  public trackByFn(i, test: HttpTest) {
    return i;
  }
}
