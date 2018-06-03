import {Pipe, PipeTransform} from '@angular/core';
import {HostData} from '../../interfaces/host/host-data';
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(hostsData: HostData[], searchText: string, tags: string[]): any[] {
    if (!hostsData) return [];
    let hosts = hostsData;
   // if (!searchText && isNullOrUndefined(tags)) return hostsData;
    if(searchText){
      searchText = searchText.toLowerCase();
      hosts = hostsData.filter(host => {
        return host.nickname.toLowerCase().includes(searchText);
      });
    }
    if(tags.length > 0){
        hosts = hosts.filter(host => {
          for(let hostTag of host.tags){
            if(tags.includes(hostTag)){
              return host;
            }
          }
        })
    }

    return hosts
  }
}
