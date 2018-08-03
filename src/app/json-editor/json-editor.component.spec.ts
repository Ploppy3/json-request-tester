import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonEditorComponent } from './json-editor.component';
import { ObjectEditorComponent } from './object-editor/object-editor.component';
import { FormsModule } from '@angular/forms';
import { ArrayEditorComponent } from './array-editor/array-editor.component';

describe('JsonEditorComponent', () => {
  let component: JsonEditorComponent;
  let fixture: ComponentFixture<JsonEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
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
    fixture = TestBed.createComponent(JsonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
