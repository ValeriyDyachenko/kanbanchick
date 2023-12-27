import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemDetailsComponent } from '~/features/item-details/components/item-details/item-details.component';
import { ItemDetailsRoutingModule } from '~/features/item-details/item-details-routing.module';
import { ItemDetailsPageComponent } from '~/features/item-details/pages/item-details-page/item-details-page.component';
import { SharedModule } from '~/shared/shared.module';

@NgModule({
  declarations: [ItemDetailsPageComponent, ItemDetailsComponent],
  imports: [CommonModule, FormsModule, ItemDetailsRoutingModule, SharedModule],
  exports: [],
})
export class ItemDetailsModule {}
