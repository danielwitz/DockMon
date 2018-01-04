import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'stateToStopped'})
export class StateToStopped implements PipeTransform {
  transform(state: string): boolean {
    return state !== 'running';
  }
}
