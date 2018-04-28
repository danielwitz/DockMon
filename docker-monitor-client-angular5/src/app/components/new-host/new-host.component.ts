import {Component, OnInit} from '@angular/core';
import {HostActionsService} from '../../services/host/host-actions.service';

@Component({
  selector: 'app-new-host',
  templateUrl: './new-host.component.html',
  styleUrls: ['./new-host.component.css']
})
export class NewHostComponent implements OnInit {
  nickname = '';
  dnsHostName = '';

  constructor(private hostActionSerivce: HostActionsService) {
  }

  ngOnInit() {
  }

  addHost() {
    this.hostActionSerivce.newHost(this.dnsHostName, this.nickname);
  }
}
