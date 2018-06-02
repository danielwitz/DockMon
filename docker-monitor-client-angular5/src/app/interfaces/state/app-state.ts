import {HostData} from '../host/host-data';
import {Log} from '../log/log';
import {SelectedContainer} from '../container/selected-container';
import {Details} from "../details/details";

export interface AppState {
  hosts: HostData[],
  containerLogs: Log[],
  selectedContainer: SelectedContainer
  containerDetails: Details
}
