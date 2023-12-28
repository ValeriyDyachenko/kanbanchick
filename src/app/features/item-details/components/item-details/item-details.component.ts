import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { Item } from '~/api/api.type';
import { ApiLocalStorageService } from '~/shared/services/api-local-storage.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
})
export class ItemDetailsComponent {
  readonly itemDetails$ = this.activatedRoute.paramMap.pipe(
    switchMap((params) => {
      const itemId = params.get('id');
      if (!itemId) {
        return throwError(
          () => new Error('Item ID not found in route parameters'),
        );
      }
      this.apiDataService.loadItemDetails(itemId);
      return this.apiDataService.itemDetails$;
    }),
    catchError((error) => {
      console.error(error);
      return of(null);
    }),
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    public apiDataService: ApiLocalStorageService,
  ) {}

  patchItem({ id, title }: { id: Item['id']; title: string }) {
    this.apiDataService.patchItem({ id, title });
  }

  patchItemDetails({ id, details }: { id: Item['id']; details: string }) {
    this.apiDataService.patchDetails({ id, details });
  }
}
