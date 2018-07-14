import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RequestService } from './request.service';
import { RequestCardComponent } from './request-card/request-card.component';
import { TesterComponent } from './tester/tester.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestCardComponent,
    TesterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [ RequestService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
