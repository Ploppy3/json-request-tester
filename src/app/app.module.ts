import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TestService } from './test.service';
import { TestCardComponent } from './test-card/test-card.component';
import { HomeComponent } from './home/home.component';
import { TestGeneratorComponent } from './test-generator/test-generator.component';
import { JsonEditorComponent } from './json-editor/json-editor.component';
import { SessionService } from './session.service';
import { ObjectEditorComponent } from './json-editor/object-editor/object-editor.component';
import { ArrayEditorComponent } from './json-editor/array-editor/array-editor.component';
import { DropfileDirective } from './dropfile.directive';

@NgModule({
  declarations: [
    AppComponent,
    TestCardComponent,
    HomeComponent,
    TestGeneratorComponent,
    ObjectEditorComponent,
    ArrayEditorComponent,
    JsonEditorComponent,
    DropfileDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [ TestService, SessionService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
