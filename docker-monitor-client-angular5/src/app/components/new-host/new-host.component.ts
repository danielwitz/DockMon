import swal from 'sweetalert2'
import {Component, OnInit} from '@angular/core';
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
      swal({
        title: 'processing...',
        timer: 7500,
        onOpen: () => {
          swal.showLoading()
        }
      }).then(() => {
        swal(
          'Added!',
          'new host has been added.',
          'success'
        );
        this.location.back();
      });
    }
  }

  private checkValidation(): Boolean {
    if(this.dnsHostName != '' && this.nickname != '') {
      this.dnsInputError = false;
      this.nickInputError = false;
      return true;
    } else {
      if(this.nickname == '') {
        this.nickInputError = true;
        swal({
          type: 'error',
          title: 'Invalid input',
          text: 'Write a nick name !',
        })
      } else { this.nickInputError = false}
        if (this.dnsHostName == '') {
          this.dnsInputError = true;
          swal({
            type: 'error',
            title: 'Invalid input',
            text: 'Write a dns host name!',
          })
        } else { this.dnsInputError = false; }
  }
  }
}
