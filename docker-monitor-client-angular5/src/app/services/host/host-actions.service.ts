import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ConfigService} from '../config/config.service';
import {HttpClient} from '@angular/common/http';
import {ContainersStatsService} from "../container/container-stats.service";
import {addTag} from "../../interfaces/add-tag/add-tag";

@Injectable()
export class HostActionsService {
  private addHostURL;
  private removeHostURL;
  private addTagToURL;

  constructor(private http: HttpClient,
              private configService: ConfigService,
              private containersStatsService: ContainersStatsService) {
    this.addHostURL = `${configService.getConfig().host}/addHost`;
    this.removeHostURL = `${configService.getConfig().host}/removeHost`;
    this.addTagToURL = `${configService.getConfig().host}/addTag`;
  }

  newHost(dnsHostName: string, nickname: string): void {
    this.http.post(this.addHostURL, {
      dnsHostName,
      nickname
    }).subscribe(() => this.containersStatsService.refreshHosts());
  }

  removeHost(dnsHostName: string): void {
    this.http.post(this.removeHostURL, {dnsHostName}).subscribe(() => this.containersStatsService.refreshHosts());
  }

  addTag(tag: addTag): void {
    let hostName = tag.hostName;
    let tagName = tag.tagName;
    this.http.post(this.addTagToURL, {hostName, tagName}).subscribe(() => this.containersStatsService.refreshHosts());
  }
}
