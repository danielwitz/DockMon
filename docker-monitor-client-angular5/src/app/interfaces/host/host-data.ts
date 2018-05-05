import {Container} from '../container/container';

export interface HostData {
  name: string;
  containers: Container[];
  nickname: string;
  tags: string[];
}
