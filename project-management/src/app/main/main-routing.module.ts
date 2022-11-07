import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsListComponent } from './pages/boards-list/boards-list.component';

const routes: Routes = [{ path: '', component: BoardsListComponent, pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class MainRoutingModule {}
