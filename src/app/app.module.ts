import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RequestService } from './request.service';
import { RequestCardComponent } from './request-card/request-card.component';
import { TesterComponent } from './tester/tester.component';
import { ToJson } from './tojson.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RequestCardComponent,
    TesterComponent,
    ToJson,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [ RequestService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
