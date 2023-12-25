import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemDetailsComponent } from '~/item-details/components/item-details/item-details.component';
import { ItemDetailsRoutingModule } from '~/item-details/item-details-routing.module';
import { ItemDetailsPageComponent } from '~/item-details/pages/item-details-page.component';
import { SharedModule } from '~/shared/shared.module';

@NgModule({
  declarations: [ItemDetailsPageComponent, ItemDetailsComponent],
  imports: [CommonModule, FormsModule, ItemDetailsRoutingModule, SharedModule],
  exports: [],
})
export class ItemDetailsModule {}
