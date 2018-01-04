import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {APP_ROUTES} from './routes/routes';
import {AppComponent} from './components/app/app.component';
import {HideFirstCharPipe} from 'app/pipes/hide-first-char/hide-first-char.pipe';
import {FixPipe} from './pipes/fix/fix.pipe';
import {PercentToColor} from './pipes/percent-to-color/percent-to-color.pipe';
import {FormatStatusPipe} from './pipes/status-format/status-format.pipe';
import {SortByFieldPipe} from './pipes/sort-by-field/sort-by-field.pipe';
import {HideSwarmSuffixPipe} from './pipes/hide-swarm-suffix/hide-swarm-suffix.pipe';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HostComponent} from './components/host/host.component';
import {ContainerComponent} from './components/container/container.component';
import {ContainerLogsComponent} from './components/container-logs/container-logs.component';
import {ConfigService} from './services/config/config.service';
import {ContainersActionsService} from './services/container/container-actions.service';
import {ContainersStatsService} from './services/container/container-stats.service';
import {HostsComponent} from './components/hosts/hosts.component';
import {SelectContainerService} from './services/container/select-container.service';
import {LogLevelToColorPipe} from './pipes/color-log/log-level-color.pipe';
import {StoreModule} from '@ngrx/store';
import {buildReducers, buildState} from './reducers/build-state-and-reducers-functions';
import {StateToRunning} from './pipes/state-to-running/state-to-running.pipe';
import {StateToStopped} from './pipes/state-to-running/state-to-stopped.pipe';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    HideFirstCharPipe,
    FixPipe,
    PercentToColor,
    FormatStatusPipe,
    SortByFieldPipe,
    HideSwarmSuffixPipe,
    AppComponent,
    HostComponent,
    ContainerComponent,
    ContainerLogsComponent,
    HostsComponent,
    LogLevelToColorPipe,
    StateToRunning,
    StateToStopped
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES),
    StoreModule.forRoot(buildReducers(), buildState())
  ],
  providers: [
    ContainersStatsService,
    ContainersActionsService,
    ConfigService,
    SelectContainerService
  ]
})

export class AppModule {
}
