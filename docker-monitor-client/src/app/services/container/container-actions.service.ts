import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ContainersStatsService} from './container-stats.service';
import {ConfigService} from '../config/config.service';

@Injectable()
export class ContainersActionsService {
  private serverUrl;

  constructor(private http: Http,
              private containersStatsService: ContainersStatsService,
              private configService: ConfigService) {
    this.serverUrl = `${configService.getConfig().host}/actions/`;
  }

  doAction(action: string, host: string, id: string): void {
    this.http.post(this.serverUrl + action, {id, host}).subscribe(() =>
      this.containersStatsService.refreshHosts());
  }

}
