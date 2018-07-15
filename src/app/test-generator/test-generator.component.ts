import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-generator',
  templateUrl: './test-generator.component.html',
  styleUrls: ['./test-generator.component.scss']
})
export class TestGeneratorComponent implements OnInit {

  public formVisible = false;

  constructor() { }

  ngOnInit() {
  }

}
