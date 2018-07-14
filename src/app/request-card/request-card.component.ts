import { Component, Input, OnInit } from '@angular/core';
import { HttpTest } from '../data';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent implements OnInit {
  @Input() request: HttpTest;
  @Input() result: any;
  
  constructor() { }

  ngOnInit() {
  }

}
