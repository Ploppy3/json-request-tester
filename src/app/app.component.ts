import { Component } from '@angular/core';
import { RequestService } from './request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private _requestService: RequestService) {
    this._requestService.get('https://www.google.fr').subscribe(
      (res) => {
        console.log(res);
      }
    )
  }
}
