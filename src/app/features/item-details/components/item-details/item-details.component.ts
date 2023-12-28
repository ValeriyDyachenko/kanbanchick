import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Item } from '~/api/api.type';
import { ApiLocalStorageService } from '~/shared/services/api-local-storage.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
})
export class ItemDetailsComponent {
  readonly itemDetails$ = this.apiDataService.itemDetails$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiDataService: ApiLocalStorageService,
  ) {
    this.activatedRoute.paramMap.pipe(first()).subscribe((params) => {
      this.apiDataService.loadItemDetails(params.get('id') as string);
    });
  }

  patchItem({ id, title }: { id: Item['id']; title: string }) {
    this.apiDataService.patchItem({ id, title });
  }

  patchItemDetails({ id, details }: { id: Item['id']; details: string }) {
    this.apiDataService.patchDetails({ id, details });
  }
}
