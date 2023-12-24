import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KanbanService } from '../kanban.service';
import { NavigationService } from '../navigation.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(
    public kanbanService: KanbanService,
    public navigationService: NavigationService,
  ) {}
}
