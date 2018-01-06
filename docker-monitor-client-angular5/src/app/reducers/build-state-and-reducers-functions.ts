import {AppReducers} from '../interfaces/state/app-reducers';
import {HostsReducer} from './hosts-reducer';
import {LogsReducer} from './logs-reducer';
import {AppState} from '../interfaces/state/app-state';
import {ContainersReducer} from './containers-reducer';

export function buildReducers(): AppReducers {
  return {
    hosts: HostsReducer.reducer,
    containerLogs: LogsReducer.reducer,
    selectedContainer: ContainersReducer.reducer
  }
}

export function buildState(): AppState {
  return {
    hosts: [],
    containerLogs: [],
    selectedContainer: undefined
  }
}
