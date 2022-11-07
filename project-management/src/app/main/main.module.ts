import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import MainRoutingModule from './main-routing.module';
import { BoardsListComponent } from './pages/boards-list/boards-list.component';
import { ShareModule } from '../share/share.module';
import { TranslocoRootModule } from '../transloco-root.module';
import { SearchBoardsPipe } from './pipes/search-boards.pipe';

@NgModule({
  declarations: [BoardsListComponent, SearchBoardsPipe],
  imports: [CommonModule, MainRoutingModule, ShareModule, TranslocoRootModule],
})
export class MainModule {}
