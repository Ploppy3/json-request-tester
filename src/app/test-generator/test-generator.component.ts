import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test-generator',
  templateUrl: './test-generator.component.html',
  styleUrls: ['./test-generator.component.scss']
})
export class TestGeneratorComponent implements OnInit {

  public formVisible = false;
  //public testObj = {};

  public testObj = {
    "status": 200,
    "description": "%any_string%",
    "data": "%any_array%"
  }
  public formTest = new FormGroup({
    url: new FormControl('https://api.travian.engin9tools.com/api/global/servers'),
    method: new FormControl('GET'),
  })

  constructor() { }

  ngOnInit() {
  }

}
class Model {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body: any;
  expectedResponse: {
    body: {};
    status: number
  };
}