import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { KanbanComponent } from './kanban/kanban.component';

export const BOARD_PATH = 'board';
export const ITEM_PATH = 'item';

const routes: Routes = [
  { path: BOARD_PATH, component: KanbanComponent },
  { path: `${ITEM_PATH}/:id`, component: ItemDetailsComponent },
  { path: '', redirectTo: `/${BOARD_PATH}`, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
