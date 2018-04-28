import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {HostComponent} from './components/host/host.component';
import {ContainerLogsComponent} from './components/container-logs/container-logs.component';
import {FixPipe} from './pipes/fix/fix.pipe';
import {HostsComponent} from './components/hosts/hosts.component';
import {PercentToColor} from './pipes/percent-to-color/percent-to-color.pipe';
import {SortByFieldPipe} from './pipes/sort-by-field/sort-by-field.pipe';
import {StateToRunning} from './pipes/state-to-running/state-to-running.pipe';
import {HideFirstCharPipe} from './pipes/hide-first-char/hide-first-char.pipe';
import {HideSwarmSuffixPipe} from './pipes/hide-swarm-suffix/hide-swarm-suffix.pipe';
import {FormatStatusPipe} from './pipes/status-format/status-format.pipe';
import {LogLevelToColorPipe} from './pipes/color-log/log-level-color.pipe';
import {ContainerComponent} from './components/container/container.component';
import {StateToStopped} from './pipes/state-to-running/state-to-stopped.pipe';
import {ConfigService} from './services/config/config.service';
import {ContainersActionsService} from './services/container/container-actions.service';
import {ContainersStatsService} from './services/container/container-stats.service';
import {SelectContainerService} from './services/container/select-container.service';
import {AppComponent} from './components/app/app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {APP_ROUTES} from './routes/routes';
import {StoreModule} from '@ngrx/store';
import {
  buildReducers,
  buildState
} from './reducers/build-state-and-reducers-functions';
import { NavComponent } from './components/nav/nav.component';
import { NewHostComponent } from './components/new-host/new-host.component';
import { HostActionsService } from './services/host/host-actions.service';


@NgModule({
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
    StateToStopped,
    NavComponent,
    NewHostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    StoreModule.forRoot(buildReducers(), {initialState: buildState()})
  ],
  providers: [
    ContainersStatsService,
    ContainersActionsService,
    ConfigService,
    SelectContainerService,
    HostActionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
