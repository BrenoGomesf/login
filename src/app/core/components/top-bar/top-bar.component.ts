import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent  implements OnInit{
  
  fullscreen: boolean = false
  currentDateTime?: string;

  ngOnInit() {
    this.loadCurrentDateTime()
  }

  loadCurrentDateTime(){
    moment.locale('pt-br');
    this.currentDateTime = moment().format('LLL')
    setInterval(() => {
      this.currentDateTime = moment().format('LLL')
    }, 60 * 1000);
  }
  

  toggleFullScreen() {
    this.fullscreen = !this.fullscreen
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }
}
