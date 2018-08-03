import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { TestGeneratorComponent } from '../test-generator/test-generator.component';
import { TestCardComponent } from '../test-card/test-card.component';
import { JsonEditorComponent } from '../json-editor/json-editor.component';
import { ArrayEditorComponent } from '../json-editor/array-editor/array-editor.component';
import { ObjectEditorComponent } from '../json-editor/object-editor/object-editor.component';
import { CodeWrapperComponent } from '../code-wrapper/code-wrapper.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        TestGeneratorComponent,
        TestCardComponent,
        JsonEditorComponent,
        ArrayEditorComponent,
        ObjectEditorComponent,
        CodeWrapperComponent,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
      ],
      providers: [
        HttpClient, HttpClient
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
