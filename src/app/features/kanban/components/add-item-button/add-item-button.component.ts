import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-item-button',
  templateUrl: './add-item-button.component.html',
})
export class AddItemButtonComponent {}
