import { Pipe, PipeTransform } from '@angular/core';
import {HostData} from "../../../../../docker-monitor-server/src/interface/host-data";
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(hostsData: HostData[], searchText: string): any[] {
    if(!hostsData) return [];
    if(!searchText) return hostsData;
    searchText = searchText.toLowerCase();
    return hostsData.filter( host => {
      return host.nickname.toLowerCase().includes(searchText);
    });
  }
}
