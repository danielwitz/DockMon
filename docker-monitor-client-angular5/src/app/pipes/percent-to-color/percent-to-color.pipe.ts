import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'percentToColor'})
export class PercentToColor implements PipeTransform {
  transform(percent: number): string {
    if (percent < 20) {
      return '0';
    } else if (percent < 45) {
      return '1';
    } else if (percent < 70) {
      return '2';
    } else if (percent < 85) {
      return '3';
    }
  }
}
