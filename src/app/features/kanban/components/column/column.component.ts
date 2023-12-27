import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { Column } from '~/api/types';
import { ApiLocalStorageService } from '~/shared/services/api-local-storage.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-column',
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
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
