import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppState} from 'app/interfaces/state/app-state';
import {Store} from '@ngrx/store';
import {ContainersActionsService} from '../../services/container/container-actions.service';
import {ContainerActionData} from '../../interfaces/container/container-action-data';
import {lineChartMulti} from '../../shared/data/ngxChart';
import * as chartsData from '../../shared/configs/ngx-charts.config';
import {ContainersStatsService} from '../../services/container/container-stats.service';

@Component({
  selector: 'dm-container-logs',
  templateUrl: 'container-logs.component.html'
})
export class ContainerLogsComponent implements OnInit {
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
  selectedContainer: any;
  memoryRefLines:any[];
  cpuRefLines:any[];

  constructor(private store: Store<AppState>,
              private containersActionService: ContainersActionsService,
              private containersStatsService: ContainersStatsService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const host = params['host'];
      const containerId = params['id'];
      this.containersStatsService.getContainerHistory(host, containerId).subscribe(data => {
        this.selectedContainer = data;
        const averageMemory = arr => arr.reduce( ( accumulator, {memory} ) =>
          accumulator + memory, 0 ) / arr.length;
        this.memoryRefLines = [
          {value: data.maxNormalMemory ? data.maxNormalMemory : averageMemory(data.stats), name: 'max normal memory'}
        ];
        const averageCpu = arr => arr.reduce( ( accumulator, {cpu} ) =>
          accumulator + cpu, 0 ) / arr.length;
        this.cpuRefLines = [
          {value: data.minNormalCpu ? data.minNormalCpu : 0, name: 'min normal cpu'},
          {value: data.maxNormalCpu ? data.maxNormalCpu : averageCpu(data.stats), name: 'max normal cpu'}
        ];
        const memory = data.stats.map(({memory, updateTime}) => {
          return {name: updateTime, value: memory};
        });
        const cpu = data.stats.map(({cpu, updateTime}) => {
          return {name: updateTime, value: cpu};
        });
        this.lineChartMulti = [{name: 'memory', series: memory}];
        this.lineChartMultiCpu = [{name: 'cpu', series: cpu}];
      });
    });
  }

  onSelect(event) {
    console.log(event);
  }

  onContainerAction(containerActionData: ContainerActionData) {
    this.containersActionService.doAction(containerActionData.action,
      containerActionData.hostName, containerActionData.id);
  }
}
