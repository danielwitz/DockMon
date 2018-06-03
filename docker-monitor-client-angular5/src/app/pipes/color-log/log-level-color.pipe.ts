import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'logLevelToColor'})
export class LogLevelToColorPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'INFO':
        return 'info-log-color';
      case 'DEBUG':
        return 'debug-log-color';
      case 'ERROR':
        return 'error-log-color';
      default :
        return 'info-log-color';
    }
  }
}
