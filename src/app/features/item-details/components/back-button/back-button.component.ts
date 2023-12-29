import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
})
export class BackButtonComponent {}
