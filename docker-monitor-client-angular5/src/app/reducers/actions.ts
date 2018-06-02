import {Action} from '@ngrx/store';
import {HostData} from '../interfaces/host/host-data';
import {SelectedContainer} from '../interfaces/container/selected-container';
import {Log} from '../interfaces/log/log';
import {Details} from "../interfaces/details/details";

export const HOST_ACTION = {
  updateStats: 'updateStats',
}
export const CONTAINER_ACTIONS = {
  startContainer: 'start',
  stopContainer: 'stop',
  restartContainer: 'restart',
  viewLogs: 'viewLogs',
  selectContainer: 'select',
  viewDetails: 'viewDetails'
}

export class UpdateHostsAction implements Action {
  readonly type = HOST_ACTION.updateStats;

  constructor(public payload?: HostData[]) {
  }
}

export class SelectContainerAction implements Action {
  readonly type = CONTAINER_ACTIONS.selectContainer;

  constructor(public payload?: SelectedContainer) {
  }
}

export class ViewContainerLogsAction implements Action {
  readonly type = CONTAINER_ACTIONS.viewLogs;

  constructor(public payload?: Log[]) {
  }
}

export class ViewContainerDetailsAction implements Action {
  readonly type = CONTAINER_ACTIONS.viewDetails;

  constructor(public payload?: Details) {
  }
}

