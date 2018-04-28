import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ConfigService} from '../config/config.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HostActionsService {

  private serverURL;

  constructor(private http: HttpClient,
              private configService: ConfigService) {
      this.serverURL = `${configService.getConfig().host}/addHost/`;
  }

  newHost(dnsHostName: string, nickname: string): void {
    console.log(this.serverURL);
    this.http.put(this.serverURL, {dnsHostName, nickname});
  }
}
