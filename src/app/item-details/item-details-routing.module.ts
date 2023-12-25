import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailsPageComponent } from '~/item-details/pages/item-details-page.component';

const routes: Routes = [{ path: '', component: ItemDetailsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemDetailsRoutingModule {}
