import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TestService } from './test.service';
import { RequestCardComponent } from './request-card/request-card.component';
import { TesterComponent } from './tester/tester.component';
import { ToJson } from './tojson.pipe';
import { TestGeneratorComponent } from './test-generator/test-generator.component';
import { JsonEditorComponent } from './test-generator/json-editor/json-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestCardComponent,
    TesterComponent,
    ToJson,
    TestGeneratorComponent,
    JsonEditorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [ TestService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
