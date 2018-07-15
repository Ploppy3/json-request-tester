import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGeneratorComponent } from './test-generator.component';

describe('TestGeneratorComponent', () => {
  let component: TestGeneratorComponent;
  let fixture: ComponentFixture<TestGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestGeneratorComponent ]
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
});
