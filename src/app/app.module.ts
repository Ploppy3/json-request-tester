import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TestService } from './test.service';
import { RequestCardComponent } from './request-card/request-card.component';
import { HomeComponent } from './home/home.component';
import { ToJson } from './tojson.pipe';
import { TestGeneratorComponent } from './test-generator/test-generator.component';
import { JsonEditorComponent } from './test-generator/json-editor/json-editor.component';
import { ArrayEditorComponent } from './test-generator/array-editor/array-editor.component';
import { JsonViewerComponent } from './json-viewer/json-viewer.component';
import { SessionService } from './session.service';

@NgModule({
  declarations: [
    AppComponent,
    RequestCardComponent,
    HomeComponent,
    ToJson,
    TestGeneratorComponent,
    JsonEditorComponent,
    ArrayEditorComponent,
    JsonViewerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ TestService, SessionService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
