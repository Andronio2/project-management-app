import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import CoreRoutingModule from './core-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ShareModule } from '../share/share.module';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/API/http-interceptor.service';

@NgModule({
  declarations: [HeaderComponent, WelcomePageComponent],
  imports: [CommonModule, CoreRoutingModule, ShareModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
