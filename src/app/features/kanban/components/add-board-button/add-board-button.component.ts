import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-board-button',
  templateUrl: './add-board-button.component.html',
})
export class AddBoardButtonComponent {}
