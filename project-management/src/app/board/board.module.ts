import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import BoardRoutingModule from './board-routing.module';
import { BoardComponent } from './pages/board/board.component';
import { ShareModule } from '../share/share.module';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [ColumnComponent, TaskComponent, BoardComponent],
  imports: [CommonModule, BoardRoutingModule, ShareModule, TranslocoModule],
})
export class BoardModule {}
