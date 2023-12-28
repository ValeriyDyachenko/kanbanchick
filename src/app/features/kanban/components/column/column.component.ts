import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { Column } from '~/api/api.type';
import { ApiLocalStorageService } from '~/shared/services/api-local-storage.service';
import { drop } from '~/utils/drag-drop.utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-column[columnId]',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnInit {
  @Input() columnId!: string;
  dragDropConnectedColumns$!: Observable<Column['id'][]>;
  column$!: Observable<Column>;

  constructor(public apiDataService: ApiLocalStorageService) {}

  ngOnInit() {
    this.dragDropConnectedColumns$ = this.apiDataService.columns$.pipe(
      map((columns) =>
        Object.keys(columns).filter((columnId) => columnId !== this.columnId),
      ),
    );
    this.column$ = this.apiDataService.columns$.pipe(
      map((columns) => columns[this.columnId]),
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    drop(
      event,
      (event) => {
        this.apiDataService.patchColumn({
          id: event.container.id,
          itemsIds: event.container.data,
        });
      },
      (event) => {
        this.apiDataService.patchColumn({
          id: event.container.id,
          itemsIds: event.container.data,
        });
        this.apiDataService.patchColumn({
          id: event.previousContainer.id,
          itemsIds: event.previousContainer.data,
        });
      },
    );
  }
}
