import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BOARD_PATH } from '~/app-routing.module';
import { RouterState } from '~/shared/navigation/router-state.type';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-item-details-page',
  templateUrl: './item-details-page.component.html',
})
export class ItemDetailsPageComponent {
  constructor(
    private location: Location,
    private router: Router,
  ) {}

  toPreviousPage() {
    const state = this.location.getState() as RouterState['state'];
    if (state.from === BOARD_PATH) {
      return this.location.back();
    }
    this.router.navigateByUrl(BOARD_PATH);
  }
}
