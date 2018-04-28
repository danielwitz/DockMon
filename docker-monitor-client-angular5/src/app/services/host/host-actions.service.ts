import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ConfigService} from '../config/config.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HostActionsService {
  private serverURL;
  private updateHostUrl;

  constructor(private http: HttpClient,
              private configService: ConfigService) {
      this.serverURL = `${configService.getConfig().host}/addHost`;
      this.updateHostUrl = `${configService.getConfig().host}/stats/getDataFromAllHosts`;
  }

  newHost(dnsHostName: string, nickname: string): void {
    this.http.post(this.serverURL, {dnsHostName, nickname}).subscribe( () =>
      console.log('done')
    );
  }
}
