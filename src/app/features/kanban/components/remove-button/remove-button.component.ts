import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-remove-button[click]',
  templateUrl: './remove-button.component.html',
})
export class RemoveButtonComponent {}
