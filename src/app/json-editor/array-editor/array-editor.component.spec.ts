import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayEditorComponent } from './array-editor.component';
import { FormsModule } from '@angular/forms';
import { ObjectEditorComponent } from '../object-editor/object-editor.component';

describe('ArrayEditorComponent', () => {
  let component: ArrayEditorComponent;
  let fixture: ComponentFixture<ArrayEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ArrayEditorComponent,
        ObjectEditorComponent,
      ],
      imports: [
        FormsModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
