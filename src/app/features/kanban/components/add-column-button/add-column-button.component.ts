import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-column-button',
  templateUrl: './add-column-button.component.html',
})
export class AddColumnButtonComponent {}
