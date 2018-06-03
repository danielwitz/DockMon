import {AppReducers} from '../interfaces/state/app-reducers';
import {HostsReducer} from './hosts-reducer';
import {LogsReducer} from './logs-reducer';
import {AppState} from '../interfaces/state/app-state';
import {ContainersReducer} from './containers-reducer';
import {DetailsReducer} from "./details-reducer";
import {TagsReducer} from "./tags-reducer";

export function buildReducers(): AppReducers {
  return {
    hosts: HostsReducer.reducer,
    containerLogs: LogsReducer.reducer,
    tags: TagsReducer.reducer,
    selectedContainer: ContainersReducer.reducer,
    containerDetails: DetailsReducer.reducer,
  }
}

export function buildState(): AppState {
  return {
    hosts: [],
    containerLogs: [],
    tags: [],
    selectedContainer: undefined,
    containerDetails: undefined
  }
}
