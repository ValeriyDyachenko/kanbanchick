import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiLocalStorageService } from '~/shared/services/api-local-storage.service';
import { drop } from '~/utils/drag-drop.utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
})
export class KanbanComponent implements OnInit {
  readonly boardsIds$ = this.apiDataService.boardsIds$;

  constructor(private apiDataService: ApiLocalStorageService) {}

  ngOnInit() {
    this.apiDataService.loadKanbanData();
  }

  dropBoard(event: CdkDragDrop<string[]>) {
    drop(event, (event) =>
      this.apiDataService.patchBoardsIds(event.container.data),
    );
  }
}
