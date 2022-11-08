import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/pages/board/board.component';
import { BoardsListComponent } from './main/pages/boards-list/boards-list.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    canLoad: [AuthGuard],
  },
  { path: 'welcome', loadChildren: () => import('./core/core.module').then((m) => m.CoreModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: 'board', component: BoardComponent }, // временный компонент для теста
  { path: 'board-list', component: BoardsListComponent }, // временный компонент для теста
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
