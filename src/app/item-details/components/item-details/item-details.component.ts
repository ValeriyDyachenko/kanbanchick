import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Subscription, tap } from 'rxjs';
import { KanbanService } from '~/shared/services/kanban.service';

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
    private kanbanService: KanbanService,
  ) {}

  patchItem(title: string) {
    this.kanbanService.patchItem(this.itemId, { title });
  }

  patchItemDetails(details: string) {
    this.kanbanService.patchItemDetails(this.itemId, { details });
  }

  ngOnInit() {
    this.subscribe = combineLatest([
      this.kanbanService.items$,
      this.kanbanService.itemDetails$,
      this.activatedRoute.paramMap,
    ])
      .pipe(
        map(([items, details, params]) => {
          const itemId = params.get('id');
          const item = items.find((item) => item.id === itemId);
          const detail = details.find((detail) => detail.id === itemId);
          return {
            itemId,
            title: item?.title,
            details: detail?.details,
          };
        }),
        tap(({ itemId, title, details }) => {
          this.itemId = itemId;
          this.title = title;
          this.details = details;
        }),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe?.();
  }
}
