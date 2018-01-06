/**
 * @ngdoc Service
 * @name queue.app.service:ConfigService
 *
 * @description enable the config via service
 *
 */
import {Injectable} from '@angular/core';
import {config} from '../../../fetch-config';

@Injectable()
export class ConfigService {
  config: any;

  constructor() {
    this.config = config;
  }

  getConfig(): any {
    return this.config;
  }

  getMapConfig() {
    return this.config.mapConfig;
  }
}
