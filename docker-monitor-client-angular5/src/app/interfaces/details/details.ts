import {PortBinding} from './port-binding';
import {Mount} from './mount';

export interface Details {
  portBindings: PortBinding[];
  envParams: string[];
  image: string;
  mounts: Mount[];
}
