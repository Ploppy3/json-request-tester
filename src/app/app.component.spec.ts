import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { TestGeneratorComponent } from './test-generator/test-generator.component';
import { TestCardComponent } from './test-card/test-card.component';
import { JsonEditorComponent } from './json-editor/json-editor.component';
import { CodeWrapperComponent } from './code-wrapper/code-wrapper.component';
import { ObjectEditorComponent } from './json-editor/object-editor/object-editor.component';
import { ArrayEditorComponent } from './json-editor/array-editor/array-editor.component';
import { HttpClientModule } from '@angular/common/http';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        TestGeneratorComponent,
        TestCardComponent,
        JsonEditorComponent,
        CodeWrapperComponent,
        ObjectEditorComponent,
        ArrayEditorComponent,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
      ],
      providers: [
        HttpClientModule,
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  /*
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to json-request-tester!');
  }));
  //*/
});
