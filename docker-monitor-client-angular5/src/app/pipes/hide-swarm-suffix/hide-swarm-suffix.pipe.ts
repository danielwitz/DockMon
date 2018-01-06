import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'hideSwarmSuffix'})
export class HideSwarmSuffixPipe implements PipeTransform {
  transform(value: string):string {
    if (value.lastIndexOf('.') > -1) {
      return value.substring(0, value.lastIndexOf('.'));
    }
    return value;
  }
}
