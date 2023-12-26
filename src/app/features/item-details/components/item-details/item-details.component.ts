import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap, tap, throwError } from 'rxjs';
import { ApiLocalStorageService } from '~/shared/services/api-local-storage.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  details?: string;
  title?: string;
  itemId: string | null = null;
  subscribe?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    public kanbanService: ApiLocalStorageService,
  ) {}

  patchItem(title: string) {
    if (!this.itemId) {
      return;
    }
    this.kanbanService.patchItem({ id: this.itemId, title });
  }

  patchItemDetails(details: string) {
    if (!this.itemId) {
      return;
    }
    this.kanbanService.patchDetails({ itemId: this.itemId, details });
  }

  ngOnInit() {
    this.subscribe = this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          const itemId = params.get('id');
          if (!itemId) {
            return throwError(
              () => new Error('Item ID not found in route parameters'),
            );
          }
          this.kanbanService.loadItemDetails(itemId);
          return this.kanbanService.itemDetails$.pipe(
            map((details) => ({ itemId, details })),
          );
        }),
        switchMap(({ itemId, details }) =>
          this.kanbanService.items$.pipe(
            map((items) => {
              const item = items[itemId];
              if (!item) {
                throw new Error(`Item not found for ID: ${itemId}`);
              }
              return {
                itemId,
                title: item.title,
                details: details?.details || '',
              };
            }),
          ),
        ),
        tap(({ itemId, title, details }) => {
          this.itemId = itemId;
          this.title = title;
          this.details = details;
        }),
      )
      .subscribe({
        error: (err) => console.error(err),
      });
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe?.();
  }
}
