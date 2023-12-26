import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiLocalStorageService } from '~/shared/services/api-local-storage.service';
import { DragDropService } from '~/shared/services/drag-drop.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
})
export class KanbanComponent implements OnInit {
  constructor(
    public dragDropService: DragDropService,
    public kanbanService: ApiLocalStorageService,
  ) {}

  ngOnInit() {
    this.kanbanService.loadKanbanData();
  }
}
