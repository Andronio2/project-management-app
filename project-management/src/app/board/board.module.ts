import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import BoardRoutingModule from './board-routing.module';
import { BoardComponent } from './pages/board/board.component';
import { ShareModule } from '../share/share.module';
import { TranslocoModule } from '@ngneat/transloco';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FilterTasksPipe } from './pipes/filter-tasks.pipe';

@NgModule({
  declarations: [ColumnComponent, TaskComponent, BoardComponent, FilterTasksPipe],
  imports: [CommonModule, BoardRoutingModule, ShareModule, TranslocoModule, DragDropModule],
})
export class BoardModule {}
