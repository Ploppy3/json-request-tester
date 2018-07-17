import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-generator',
  templateUrl: './test-generator.component.html',
  styleUrls: ['./test-generator.component.scss']
})
export class TestGeneratorComponent implements OnInit {

  public formVisible = false;
  //public testObj = {};
  //*
  public testObj = {
    "status": 200,
    "description": "%any_string%",
    "data": "%any_array%"
  }
  //*/

  constructor() { }

  ngOnInit() {
  }

}
