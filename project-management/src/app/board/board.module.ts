import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateColumnComponent } from './components/create-column/create-column.component';
import { ShareModule } from '../share/share.module';
import { CreateTaskComponent } from './components/create-task/create-task.component';

@NgModule({
  declarations: [CreateColumnComponent, CreateTaskComponent],
  imports: [CommonModule, ShareModule],
})
export class BoardModule {}
