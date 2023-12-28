import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ApiLocalStorageService } from '~/shared/services/api-local-storage.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-item[itemId]',
  templateUrl: './item.component.html',
})
export class ItemComponent {
  @Input() itemId!: string;
  constructor(
    public apiDataService: ApiLocalStorageService,
    public router: Router,
  ) {}

  getItemById(id: string) {
    return this.apiDataService.items$.pipe(map((items) => items[id]));
  }
}
