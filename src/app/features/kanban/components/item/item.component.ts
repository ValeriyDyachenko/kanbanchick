import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ApiLocalStorageService } from '~/shared/services/api-local-storage.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() itemId?: string;
  constructor(
    public kanbanService: ApiLocalStorageService,
    public router: Router,
  ) {}

  getItemById(id: string) {
    return this.kanbanService.items$.pipe(map((items) => items[id]));
  }
}
