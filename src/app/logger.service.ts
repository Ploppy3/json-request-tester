import { Injectable, ErrorHandler } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(
    private errorHandler: ErrorHandler
  ) {
    this.log(this, 'constructor LoggerService');
  }

  public log(obj: any, value: any, ...rest: any[]) {
    if (!environment.production) {
      console.log("%c" + obj.constructor.name, "color:" + 'red', value, ...rest);
    }
  }

  public error(error: Error) {
    this.errorHandler.handleError(error);
  }

  public warn(value: any, ...rest: any[]) {
    console.warn(value, ...rest);
  }
}
