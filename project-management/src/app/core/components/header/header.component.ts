import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  activeLang: string;

  availableLang: string[] | { id: string; label: string }[];

  constructor(private translateService: TranslocoService) {
    this.activeLang = this.translateService.getActiveLang();
    this.availableLang = this.translateService.getAvailableLangs();
  }

  changeLang(lang: string) {
    this.translateService.setActiveLang(lang);
    this.activeLang = lang;
  }
}
