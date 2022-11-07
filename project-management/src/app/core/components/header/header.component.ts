import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { UserActions } from 'src/app/redux/actions/users.actions';
import { UserSelectors } from 'src/app/redux/selectors/user.selectors';
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

  isAuth$ = this.store.select(UserSelectors.selectIsAuth);

  constructor(
    private modalService: ModalService,
    private translateService: TranslocoService,
    private authService: AuthService,
    private store: Store,
  ) {
    this.activeLang = localStorage.getItem('lang') || this.translateService.getActiveLang();
    this.availableLang = this.translateService.getAvailableLangs();
  }

  ngOnInit() {
    if (this.authService.isAuth()) {
      this.store.dispatch(UserActions.SignInSuccess());
    }
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

  logOut() {
    this.authService.logOut();
  }
}
