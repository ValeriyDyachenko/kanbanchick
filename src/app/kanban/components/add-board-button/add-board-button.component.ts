import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KanbanService } from '~/shared/services/kanban.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-board-button',
  templateUrl: './add-board-button.component.html',
})
export class AddBoardButtonComponent {
  constructor(private kanbanService: KanbanService) {}
  addBoard() {
    this.kanbanService.addBoard();
  }
}
