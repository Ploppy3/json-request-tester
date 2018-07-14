import { Component, Input, OnInit } from '@angular/core';
import { HttpTest } from '../data';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent implements OnInit {
  @Input() test: HttpTest;
  @Input() result: any;
  
  constructor(
    private requestService: RequestService
  ) { }

  ngOnInit() {

  }
}
