import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardComponent } from '../create-board/create-board.component';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  activeLang: string;

  availableLang: string[] | { id: string; label: string }[];

  constructor(private dialog: MatDialog, private translateService: TranslocoService) {
    this.activeLang = localStorage.getItem('lang') || this.translateService.getActiveLang();
    this.availableLang = this.translateService.getAvailableLangs();
  }

  ngOnInit() {
    this.translateService.setActiveLang(this.activeLang);
  }

  public openCreateMod() {
    this.dialog.open(CreateBoardComponent, {
      minWidth: '300px',
      maxWidth: '500px',
    });
  }

  changeLang(lang: string) {
    this.translateService.setActiveLang(lang);
    this.activeLang = lang;
    localStorage.setItem('lang', this.activeLang);
  }
}
