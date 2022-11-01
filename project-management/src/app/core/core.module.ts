import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import CoreRoutingModule from './core-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ShareModule } from '../share/share.module';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

@NgModule({
  declarations: [HeaderComponent, WelcomePageComponent],
  imports: [CommonModule, CoreRoutingModule, ShareModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
