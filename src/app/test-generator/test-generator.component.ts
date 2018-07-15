import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-generator',
  templateUrl: './test-generator.component.html',
  styleUrls: ['./test-generator.component.scss']
})
export class TestGeneratorComponent implements OnInit {

  public formVisible = false;
  public testObj = {
    _string: 'string',
    _number: 123,
    _boolean: true,
    _arr: ['a', 'b', 'c'],
    _obj: { myKey: 'myVal' }
  }

  constructor() { }

  ngOnInit() {
  }

}
