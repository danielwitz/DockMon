import {Log} from '../interfaces/log/log';
import {CONTAINER_ACTIONS, ViewContainerLogsAction} from './actions';

export type Action = ViewContainerLogsAction;

export class LogsReducer {
  static reducer(state: Log[], action: Action): Log[] {
    switch (action.type) {
      case CONTAINER_ACTIONS.viewLogs:
        return LogsReducer.updateLogs(action);
      default:
        return state;
    }
  }

  private static updateLogs(action: Action): Log[] {
    return action.payload;
  }
}
