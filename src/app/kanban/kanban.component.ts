import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DragDropService } from '../drag-drop.service';
import { KanbanService } from '../kanban.service';
import type { Board } from '../kanban.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
})
export class KanbanComponent {
  constructor(
    public dragDropService: DragDropService,
    public kanbanService: KanbanService,
  ) {}
}
