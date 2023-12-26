import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLocalStorageService } from '~/shared/services/api-local-storage.service';
import {
  DragDropService,
  ItemsInColumnDragDrop,
} from '~/shared/services/drag-drop.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnInit {
  @Input() columnId?: string;
  itemsInsideColumnDragDrop?: Observable<ItemsInColumnDragDrop | null>;

  constructor(
    public kanbanService: ApiLocalStorageService,
    public dragDropService: DragDropService,
  ) {}

  ngOnInit() {
    if (!this.columnId) {
      return;
    }
    this.itemsInsideColumnDragDrop =
      this.dragDropService.initItemsInColumnDragDropSubscription(this.columnId);
  }
}
