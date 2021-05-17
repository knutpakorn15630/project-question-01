import { Component, OnInit } from '@angular/core';
import { NgBroadcasterService } from 'ngx-broadcaster';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {

  message: string;

  constructor(private broadcaster: NgBroadcasterService) { }

  ngOnInit(): void {
    this.broadcaster.listen('event-Question').subscribe(res => {
      this.message = res.message;
      console.log(`this is a logout ${this.message}`);
    });
  }

}
