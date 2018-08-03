import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGeneratorComponent } from './test-generator.component';
import { FormsModule } from '@angular/forms';
import { JsonEditorComponent } from '../json-editor/json-editor.component';
import { ObjectEditorComponent } from '../json-editor/object-editor/object-editor.component';
import { ArrayEditorComponent } from '../json-editor/array-editor/array-editor.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('TestGeneratorComponent', () => {
  let component: TestGeneratorComponent;
  let fixture: ComponentFixture<TestGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestGeneratorComponent,
        JsonEditorComponent,
        ObjectEditorComponent,
        ArrayEditorComponent,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
      ],
      providers: [
        HttpClient,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('button-add should call onSubmit method', () => {
    let button = fixture.nativeElement.querySelector('#button-add');
    let spy = spyOn(component, 'onSubmit');
    button.click();
    expect(spy).toHaveBeenCalled();
  })
});
