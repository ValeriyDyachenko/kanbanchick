import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  ColumnsInBoardDragDrop,
  DragDropService,
} from '~/shared/services/drag-drop.service';
import { KanbanService } from '~/shared/services/kanban.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  @Input() boardId?: string;
  columnsInBoardDragDrop?: Observable<ColumnsInBoardDragDrop | null>;

  constructor(
    public kanbanService: KanbanService,
    public dragDropService: DragDropService,
  ) {}

  ngOnInit() {
    if (!this.boardId) {
      return;
    }
    this.columnsInBoardDragDrop =
      this.dragDropService.initColumnsInBoardDragDropSubscription(this.boardId);
  }
}
