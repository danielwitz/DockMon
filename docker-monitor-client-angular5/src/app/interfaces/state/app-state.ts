import {HostData} from '../host/host-data';
import {Log} from '../log/log';
import {SelectedContainer} from '../container/selected-container';

export interface AppState {
  hosts: HostData[],
  containerLogs: Log[],
  selectedContainer: SelectedContainer
}
