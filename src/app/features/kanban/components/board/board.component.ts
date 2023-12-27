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
import { Board } from '~/api/types';
import { ApiLocalStorageService } from '~/shared/services/api-local-storage.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-board',
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
