import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription, switchMap, tap } from 'rxjs';
import { KanbanService } from '../kanban.service';
import { NavigationService } from '../navigation.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;
  details?: string;
  title?: string;
  itemId: string | null = null;

  constructor(
    public navigationService: NavigationService,
    public kanbanService: KanbanService,
  ) {}

  ngOnInit() {
    this.subscription = this.navigationService.currentItemDetailsId$
      .pipe(
        tap((id) => (this.itemId = id)),
        switchMap((id) =>
          id
            ? this.kanbanService.getItemDetailsById(id)
            : of({ details: '', title: '' }),
        ),
      )
      .subscribe((itemDetails) => {
        this.details = itemDetails.details;
        this.title = itemDetails.title;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
