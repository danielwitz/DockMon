import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'stateToRunning'})
export class StateToRunning implements PipeTransform {
  transform(state: string): boolean {
    return state === 'running';
  }
}
