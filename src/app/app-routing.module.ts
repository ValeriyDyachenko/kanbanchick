import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const BOARD_PATH = 'board';
export const ITEM_PATH = 'item';

const routes: Routes = [
  { path: '', redirectTo: `/${BOARD_PATH}`, pathMatch: 'full' },
  {
    path: BOARD_PATH,
    loadChildren: () =>
      import('./features/kanban/kanban.module').then((m) => m.KanbanModule),
  },
  {
    path: `${ITEM_PATH}/:id`,
    loadChildren: () =>
      import('./features/item-details/item-details.module').then(
        (m) => m.ItemDetailsModule,
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
