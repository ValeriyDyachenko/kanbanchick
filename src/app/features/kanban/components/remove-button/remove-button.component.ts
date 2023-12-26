import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

const noop = () => {
  return undefined;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-remove-button',
  templateUrl: './remove-button.component.html',
})
export class RemoveButtonComponent {
  @Input() onClick: () => void = noop;
}
