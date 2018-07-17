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
import { JsonViewerComponent } from './json-viewer/json-viewer.component';
import { SessionService } from './session.service';
import { JsonEditorComponent } from './json-viewer/json-editor/json-editor.component';
import { ArrayEditorComponent } from './json-viewer/array-editor/array-editor.component';

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
