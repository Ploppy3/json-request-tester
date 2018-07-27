import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeWrapperComponent } from './code-wrapper.component';

describe('CodeWrapperComponent', () => {
  let component: CodeWrapperComponent;
  let fixture: ComponentFixture<CodeWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
