import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import MainRoutingModule from './main-routing.module';
import { BoardsListComponent } from './pages/boards-list/boards-list.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [BoardsListComponent],
  imports: [CommonModule, MainRoutingModule, ShareModule],
})
export class MainModule {}
