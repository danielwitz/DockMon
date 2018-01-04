import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ConfigService} from '../config/config.service';
import {Log} from '../../interfaces/log/log';
import {SelectedContainer} from '../../interfaces/container/selected-container';
import {Store} from '@ngrx/store';
import {AppState} from '../../interfaces/state/app-state';
import {SelectContainerAction, ViewContainerLogsAction} from '../../reducers/actions';

@Injectable()
export class SelectContainerService {
  private serverUrl: string;

  constructor(private http: Http,
              private configService: ConfigService,
              private store: Store<AppState>) {
    this.serverUrl = `${configService.getConfig().host}/logs/getLogs`;
  }

  selectContainer(selectedContainer: SelectedContainer) {
    this.updateSelectedContainer(selectedContainer);
    this.getLogs(selectedContainer.hostName, selectedContainer.id).subscribe(this.updateLogs.bind(this));
  }

  private updateLogs(logs: Log[]) {
    this.store.dispatch(new ViewContainerLogsAction(logs));
  }

  private updateSelectedContainer(selectedContainer: SelectedContainer) {
    this.store.dispatch(new SelectContainerAction(selectedContainer));
  }

  private getLogs(host: string, containerId: string): Observable<Log[]> {
    return this.http.get(`${this.serverUrl}/${host}/${containerId}`).map((res: any) =>
      JSON.parse(res._body));
  }
}
