import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { UserActions } from 'src/app/redux/actions/users.actions';
import { UserSelectors } from 'src/app/redux/selectors/user.selectors';
import { ModalType } from 'src/app/share/constants/constants';
import { AuthService } from '../../services/API/auth.service';
import { ModalService } from '../../services/modal.service';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ProgressBarService } from '../../services/progress-bar.service';

enum Lang {
  EN = 'en',
  RU = 'ru',
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @HostListener('window:scroll', ['event']) onScroll() {
    if (this.headerChanged === false) this.headerChanged = window.scrollY > 64 ? true : false;
    if (this.headerChanged === true) this.headerChanged = window.scrollY > 20 ? true : false;
  }

  headerChanged = false;

  activeLang: string;

  availableLang: string[] | { id: string; label: string }[];

  isAuth$ = this.store.select(UserSelectors.selectIsAuth);

  hideSideMenu = false;

  isLoading$ = new Observable<boolean>();

  destroy$ = new Subject();

  lang = localStorage.getItem('lang') || 'en';

  isChecked = this.lang === 'en' ? true : false;

  constructor(
    private modalService: ModalService,
    private translateService: TranslocoService,
    private authService: AuthService,
    private store: Store,
    private responsive: BreakpointObserver,
    private router: Router,
    private progressBarService: ProgressBarService,
  ) {
    this.activeLang = localStorage.getItem('lang') || this.translateService.getActiveLang();
    this.availableLang = this.translateService.getAvailableLangs();
    this.isLoading$ = this.progressBarService.isLoading$;
  }

  ngOnInit() {
    if (this.authService.isAuth()) {
      this.store.dispatch(UserActions.SignInSuccess());
    }
    this.translateService.setActiveLang(this.activeLang);

    this.responsive
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.hideSideMenu = false;

        if (result.matches) {
          this.hideSideMenu = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public openCreateMod() {
    this.modalService.openCreateMod(ModalType.CREATE, ModalType.BOARD);
  }

  changeLang(checkedFlag: boolean) {
    this.lang = checkedFlag ? Lang.EN : Lang.RU;
    this.translateService.setActiveLang(this.lang);
    this.activeLang = this.lang;
    localStorage.setItem('lang', this.activeLang);
  }

  logOut() {
    this.authService.logOut();
  }

  goToMainPage() {
    this.router.navigate(['/main']);
  }
}
