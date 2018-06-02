import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ConfigService} from '../config/config.service';
import {Log} from '../../interfaces/log/log';
import {SelectedContainer} from '../../interfaces/container/selected-container';
import {Store} from '@ngrx/store';
import {AppState} from '../../interfaces/state/app-state';
import {SelectContainerAction, ViewContainerDetailsAction, ViewContainerLogsAction} from '../../reducers/actions';
import {Details} from '../../interfaces/details/details';

@Injectable()
export class SelectContainerService {
  private logsApiUrl: string;
  private detailsApiUrl: string;

  constructor(private http: HttpClient,
              private configService: ConfigService,
              private store: Store<AppState>) {
    this.logsApiUrl = `${configService.getConfig().host}/logs/getLogs`;
    this.detailsApiUrl = `${configService.getConfig().host}/extraDetails`;
  }

  selectContainer(selectedContainer: SelectedContainer) {
    this.updateSelectedContainer(selectedContainer);
    this.getLogs(selectedContainer.hostName, selectedContainer.id).subscribe(this.updateLogs.bind(this));
    this.getDetails(selectedContainer.hostName, selectedContainer.id).subscribe(this.updateDetails.bind(this));
  }

  private updateLogs(logs: Log[]) {
    this.store.dispatch(new ViewContainerLogsAction(logs));
  }

  private updateDetails(details: Details) {
    this.store.dispatch(new ViewContainerDetailsAction(details));
  }

  private updateSelectedContainer(selectedContainer: SelectedContainer) {
    this.store.dispatch(new SelectContainerAction(selectedContainer));
  }

  private getLogs(host: string, containerId: string): Observable<Log[]> {
    return this.http.get(`${this.logsApiUrl}/${host}/${containerId}`).map((res: any) =>
      JSON.parse(res._body));
  }

  private getDetails(host: string, containerId: string): Observable<Details> {
    return this.http.get(`${this.detailsApiUrl}/${host}/${containerId}`).map((res: any) =>
      JSON.parse(res._body));
  }
}
