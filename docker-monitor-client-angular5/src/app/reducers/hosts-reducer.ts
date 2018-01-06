import {HostData} from '../interfaces/host/host-data';
import {HOST_ACTION, UpdateHostsAction} from './actions';

export type Action = UpdateHostsAction;

export class HostsReducer {
  static reducer(state: HostData[], action: Action): HostData[] {
    switch (action.type) {
      case HOST_ACTION.updateStats:
        return HostsReducer.updateStats(action);
      default:
        return state;
    }
  }

  private static updateStats(action: Action): HostData[] {
    return action.payload;
  }
}
