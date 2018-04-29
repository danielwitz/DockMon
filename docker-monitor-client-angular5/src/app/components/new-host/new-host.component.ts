import {Component, OnInit, style} from '@angular/core';
import {HostActionsService} from '../../services/host/host-actions.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-host',
  templateUrl: './new-host.component.html',
  styleUrls: ['./new-host.component.css']
})
export class NewHostComponent implements OnInit {
  nickname = '';
  dnsHostName = '';
  dnsInputError = false;
  nickInputError = false;

  constructor(private hostActionSerivce: HostActionsService,
              private location: Location) {
  }

  ngOnInit() {
  }

  addHost() {
    if (this.checkValidation()) {
      this.hostActionSerivce.newHost(this.dnsHostName, this.nickname);
      this.location.back();
    }
  }

  private checkValidation(): Boolean {
    if(this.dnsHostName != '' && this.nickname != '') {
      this.dnsInputError = false;
      this.nickInputError = false;
      return true;
    } else {
        if (this.dnsHostName == '') {
          this.dnsInputError = true;
        } else { this.dnsInputError = false; }
        if(this.nickname == '') {
          this.nickInputError = true;
      } else { this.nickInputError = false}
  }
  }
}
