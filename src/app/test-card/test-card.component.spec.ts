import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCardComponent } from './test-card.component';
import { FormsModule } from '@angular/forms';
import { CodeWrapperComponent } from '../code-wrapper/code-wrapper.component';
import { JsonEditorComponent } from '../json-editor/json-editor.component';
import { ObjectEditorComponent } from '../json-editor/object-editor/object-editor.component';
import { ArrayEditorComponent } from '../json-editor/array-editor/array-editor.component';

describe('TestCardComponent', () => {
  let component: TestCardComponent;
  let fixture: ComponentFixture<TestCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestCardComponent,
        CodeWrapperComponent,
        JsonEditorComponent,
        ObjectEditorComponent,
        ArrayEditorComponent,
      ],
      imports: [
        FormsModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
