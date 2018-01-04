import {Pipe, PipeTransform} from '@angular/core';

const statParse: RegExp = /(?:(\d{1,2})\s)?(second|minute|hour|day|week|month|year)/g;

@Pipe({name: 'formatStatus'})
export class FormatStatusPipe implements PipeTransform {
  transform(status: string): string {
    let res: string = status;

    if (res && res.match(statParse)) {
      const parts = statParse.exec(res);
      res = `${parts[1] ? parts[1] : '1'}${parts[2][0]}`;
    }
    return res;
  }
}
