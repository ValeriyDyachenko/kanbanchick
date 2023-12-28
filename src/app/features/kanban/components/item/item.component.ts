import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { BOARD_PATH } from '~/app-routing.module';
import { RouterState } from '~/shared/navigation/router-state.type';
import { ApiLocalStorageService } from '~/shared/services/api-local-storage.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-item[itemId]',
  templateUrl: './item.component.html',
})
export class ItemComponent {
  @Input() itemId!: string;

  readonly item$ = this.apiDataService.items$.pipe(
    map((items) => items[this.itemId]),
  );

  constructor(
    private apiDataService: ApiLocalStorageService,
    private router: Router,
  ) {}

  navigateToDetails() {
    const routerState: RouterState = { state: { from: BOARD_PATH } };
    this.router.navigate(['/item', this.itemId], routerState);
  }

  patchItemTitle(title: string) {
    this.apiDataService.patchItem({ id: this.itemId, title });
  }

  deleteItem() {
    this.apiDataService.deleteItem(this.itemId);
  }
}
