import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-item-details-page',
  templateUrl: './item-details-page.component.html',
})
export class ItemDetailsPageComponent {
  toPreviousPage: () => void;

  constructor(private location: Location) {
    this.toPreviousPage = () => this.location.back();
  }
}
