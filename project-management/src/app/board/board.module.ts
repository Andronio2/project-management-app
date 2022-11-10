import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import BoardRoutingModule from './board-routing.module';
import { BoardComponent } from './pages/board/board.component';
import { ShareModule } from '../share/share.module';
import { TranslocoModule } from '@ngneat/transloco';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ColumnComponent, TaskComponent, BoardPreviewComponent, BoardComponent],
  imports: [CommonModule, BoardRoutingModule, ShareModule, TranslocoModule, DragDropModule],
})
export class BoardModule {}
