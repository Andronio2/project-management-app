import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './core/pages/welcome-page/welcome-page.component';
import { BoardComponent } from './board/pages/board/board.component';
import { BoardsListComponent } from './board/pages/boards-list/boards-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: 'board', component: BoardComponent }, // временный компонент для теста
  { path: 'board-list', component: BoardsListComponent }, // временный компонент для теста
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
