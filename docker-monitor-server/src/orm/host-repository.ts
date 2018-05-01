import {Repository} from './repository';
import {HostData} from '../interface/host-data';
import {Host} from './schema'

export class HostRepository extends Repository<HostData> {
    constructor() {
        super(Host)
    }
}
