import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectEditorComponent } from './object-editor.component';
import { FormsModule } from '@angular/forms';
import { ArrayEditorComponent } from '../array-editor/array-editor.component';

describe('ObjectEditorComponent', () => {
  let component: ObjectEditorComponent;
  let fixture: ComponentFixture<ObjectEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
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
    fixture = TestBed.createComponent(ObjectEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
