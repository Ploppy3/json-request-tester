import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toJson'
})
export class ToJson implements PipeTransform {

  transform(value: any, args?: any): any {
    try {
      value = JSON.parse(value);
    } catch (error) { };
    return value;
  }

}
