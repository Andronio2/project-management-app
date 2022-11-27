import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  ngOnInit(): void {
    AOS.init();
  }
}
