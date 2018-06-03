import {HostData} from '../host/host-data';
import {Action} from '@ngrx/store';
import {Log} from '../log/log';
import {SelectedContainer} from '../container/selected-container';
import {Details} from "../details/details";

export interface AppReducers {
  hosts: (state: HostData[], action: Action) => HostData[];
  containerLogs: (state: Log[], action: Action) => Log[];
  tags: (state: string[], action: Action) => string[];
  selectedContainer: (state: SelectedContainer, action: Action) => SelectedContainer;
  containerDetails: (state: Details, action: Action) => Details;
}
