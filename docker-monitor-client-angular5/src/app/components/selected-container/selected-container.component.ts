import {Component, OnInit} from '@angular/core';
import {Log} from '../../interfaces/log/log';
import {SelectedContainer} from '../../interfaces/container/selected-container';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {ContainersActionsService} from '../../services/container/container-actions.service';
import {ContainerActionData} from '../../interfaces/container/container-action-data';
import {HostData} from '../../interfaces/host/host-data';
import {Container} from '../../interfaces/container/container';
import {Details} from '../../interfaces/details/details';
import {ContainersStatsService} from '../../services/container/container-stats.service';
import {SelectContainerService} from '../../services/container/select-container.service';
import {ActivatedRoute} from '@angular/router';
import {AppState} from '../../interfaces/state/app-state';
import * as chartsData from "../../shared/configs/ngx-charts.config";

@Component({
  selector: 'dm-selected-container',
  templateUrl: './selected-container.component.html'
})
export class SelectedContainerComponent implements OnInit {
  logs: Observable<Log[]>;
  details: Observable<Details>;
  selectedContainer: Container;
  hostName: string;
  lineChartMulti = [];
  lineChartMultiCpu = [];

  lineChartView: any[] = chartsData.lineChartView;

  // options
  lineChartShowXAxis = chartsData.lineChartShowXAxis;

  lineChartShowYAxis = chartsData.lineChartShowYAxis;
  lineChartGradient = chartsData.lineChartGradient;
  lineChartShowLegend = chartsData.lineChartShowLegend;
  lineChartShowXAxisLabel = chartsData.lineChartShowXAxisLabel;
  lineChartXAxisLabel = chartsData.lineChartXAxisLabel;
  lineChartShowYAxisLabel = chartsData.lineChartShowYAxisLabel;
  lineChartColorScheme = chartsData.lineChartColorScheme;

  // line, area
  lineChartAutoScale = chartsData.lineChartAutoScale;

  lineChartLineInterpolation = chartsData.lineChartLineInterpolation;
  memoryRefLines: any[];
  cpuRefLines: any[];

  constructor(private store: Store<AppState>,
              private containersActionService: ContainersActionsService,
              private containerStatsService: ContainersStatsService,
              private selectContainerService: SelectContainerService,
              private router: ActivatedRoute) {
    router.params.subscribe((params) => this.selectContainerService.selectContainer({
      hostName: params['host'],
      id: params['id']
    }));

    this.logs = this.store.select<Log[]>((state: AppState) => state.containerLogs);
    this.details = this.store.select<Details>((state: AppState) => state.containerDetails);
    Observable.combineLatest(this.store.select<HostData[]>((state: AppState) => state.hosts),
      this.store.select<SelectedContainer>((state: AppState) => state.selectedContainer), (hosts, selectedContainer) => {
        if (selectedContainer && hosts && hosts.length > 0) {
          this.hostName = selectedContainer.hostName;
          return hosts.find((host) => host.name === selectedContainer.hostName).containers.find((container) =>
            container.id === selectedContainer.id);
        }
      }).subscribe((selectedContainer) =>
        this.selectedContainer = selectedContainer);
  }

  ngOnInit(): void {
    this.store.select<SelectedContainer>((state: AppState) => (state.selectedContainer)).subscribe(selectedContainer => {
      this.containerStatsService.getContainerHistory(selectedContainer.hostName, selectedContainer.id).subscribe(data => {
        const averageMemory = arr => arr.reduce((accumulator, {memory}) =>
          accumulator + memory, 0) / arr.length;
        this.memoryRefLines = [
          {value: data.maxNormalMemory ? data.maxNormalMemory : averageMemory(data.stats), name: 'max normal memory'}
        ];
        const averageCpu = arr => arr.reduce((accumulator, {cpu}) =>
          accumulator + cpu, 0) / arr.length;
        this.cpuRefLines = [
          {value: data.minNormalCpu ? data.minNormalCpu : 0, name: 'min normal cpu'},
          {value: data.maxNormalCpu ? data.maxNormalCpu : averageCpu(data.stats), name: 'max normal cpu'}
        ];
        const memory = data.stats.map(({memory, updateTime}) => {
          if(!isNaN(memory)) return {name: updateTime, value: memory};
        });
        const cpu = data.stats.map(({cpu, updateTime}) => {
          if(!isNaN(cpu)) return {name: updateTime, value: cpu};
        });
        this.lineChartMulti = [{name: 'memory', series: memory}];
        this.lineChartMultiCpu = [{name: 'cpu', series: cpu}];
      });
    });
  }

  onContainerAction(containerActionData: ContainerActionData) {
    this.containersActionService.doAction(containerActionData.action,
      containerActionData.hostName, containerActionData.id);
  }

  onSelect(event) {
    console.log(event);
  }
}
