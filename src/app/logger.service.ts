import { Injectable, ErrorHandler } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(
    private errorHandler: ErrorHandler
  ) { }

  public log(value: any, ...rest: any[]) {
    if (!environment.production) {
      console.log(value, ...rest);
    }
  }

  public error(error: Error) {
    this.errorHandler.handleError(error);
  }

  public warn(value: any, ...rest: any[]) {
    console.warn(value, ...rest);
  }
}
