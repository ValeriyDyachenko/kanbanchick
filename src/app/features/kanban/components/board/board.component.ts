import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { Board } from '~/api/types';
import { ApiLocalStorageService } from '~/shared/services/api-local-storage.service';
import { drop } from '~/utils/drag-drop.utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-board[boardId]',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  @Input() boardId!: string;
  dragDropConnectedBoards$!: Observable<Board['id'][]>;
  board$!: Observable<Board>;

  constructor(public apiDataService: ApiLocalStorageService) {}

  ngOnInit() {
    this.dragDropConnectedBoards$ = this.apiDataService.boardsIds$.pipe(
      map((ids) => ids.filter((id) => id !== this.boardId)),
    );

    this.board$ = this.apiDataService.boards$.pipe(
      map((boards) => boards[this.boardId]),
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    drop(
      event,
      (event) => {
        this.apiDataService.patchBoard({
          id: event.container.id,
          columnsIds: event.container.data,
        });
      },
      (event) => {
        this.apiDataService.patchBoard({
          id: event.container.id,
          columnsIds: event.container.data,
        });
        this.apiDataService.patchBoard({
          id: event.previousContainer.id,
          columnsIds: event.previousContainer.data,
        });
      },
    );
  }
}
