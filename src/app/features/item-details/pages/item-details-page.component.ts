import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-item-details-page',
  templateUrl: './item-details-page.component.html',
})
export class ItemDetailsPageComponent {
  toPreviousPage: () => void;

  constructor(private location: Location) {
    this.toPreviousPage = () => this.location.back();
  }
}
