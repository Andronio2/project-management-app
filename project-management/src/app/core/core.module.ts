import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import CoreRoutingModule from './core-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ShareModule } from '../share/share.module';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/API/http-interceptor.service';
import { FooterComponent } from './components/footer/footer.component';
import { CreateModalComponent } from './components/create-modal/create-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { TranslocoRootModule } from '../transloco-root.module';

@NgModule({
  declarations: [
    HeaderComponent,
    WelcomePageComponent,
    FooterComponent,
    CreateModalComponent,
    ConfirmModalComponent,
  ],
  imports: [CommonModule, CoreRoutingModule, ShareModule, HttpClientModule, TranslocoRootModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  exports: [HeaderComponent, FooterComponent, ConfirmModalComponent],
})
export class CoreModule {}
