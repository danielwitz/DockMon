import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'fix'})
export class FixPipe implements PipeTransform {
  transform(value: number, fraction?: number): string {
    return value ? value.toFixed(2) : '0.00';
  }
}
