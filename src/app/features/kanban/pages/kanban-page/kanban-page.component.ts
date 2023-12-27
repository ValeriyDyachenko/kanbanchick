import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-kanban-page',
  templateUrl: './kanban-page.component.html',
})
export class KanbanPageComponent {}
