/**
 * @ngdoc Service
 * @name queue.app.service:ConfigService
 *
 * @description enable the config via service
 *
 */
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable()
export class ConfigService {
  getConfig(): any {
    return environment;
  }
}
