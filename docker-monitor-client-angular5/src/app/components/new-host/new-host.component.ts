import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-new-host',
  templateUrl: './new-host.component.html',
  styleUrls: ['./new-host.component.css']
})
export class NewHostComponent implements OnInit {
  nickname: string ="";
  dnsHostName: string= "";

  constructor() {
  }

  ngOnInit() {
  }

  saveHost() {

  }
}
