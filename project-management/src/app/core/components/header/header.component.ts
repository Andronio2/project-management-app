import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  activeLang: string;

  availableLang: string[] | { id: string; label: string }[];

  constructor(private translateService: TranslocoService) {
    this.activeLang = localStorage.getItem('lang') || this.translateService.getActiveLang();
    this.availableLang = this.translateService.getAvailableLangs();
  }

  ngOnInit() {
    this.translateService.setActiveLang(this.activeLang);
  }

  changeLang(lang: string) {
    this.translateService.setActiveLang(lang);
    this.activeLang = lang;
    localStorage.setItem('lang', this.activeLang);
  }
}
