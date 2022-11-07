import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ModalType } from 'src/app/share/constants/constants';
import { AuthService } from '../../services/API/auth.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  activeLang: string;

  availableLang: string[] | { id: string; label: string }[];

  isAuth: boolean;

  constructor(
    private modalService: ModalService,
    private translateService: TranslocoService,
    private authService: AuthService,
  ) {
    this.activeLang = localStorage.getItem('lang') || this.translateService.getActiveLang();
    this.availableLang = this.translateService.getAvailableLangs();
    this.isAuth = this.authService.isAuth();
  }

  ngOnInit() {
    this.translateService.setActiveLang(this.activeLang);
  }

  public openCreateMod() {
    this.modalService.openCreateMod(ModalType.CREATE, ModalType.BOARD);
  }

  changeLang(lang: string) {
    this.translateService.setActiveLang(lang);
    this.activeLang = lang;
    localStorage.setItem('lang', this.activeLang);
  }
}
