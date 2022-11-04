import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { BoardsListComponent } from './pages/boards-list/boards-list.component';
import { BoardPreviewComponent } from './components/board-preview/board-preview.component';

@NgModule({
  declarations: [ColumnComponent, TaskComponent, BoardsListComponent, BoardPreviewComponent],
  imports: [CommonModule],
})
export class BoardModule {}
