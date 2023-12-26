import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-column-button',
  templateUrl: './add-column-button.component.html',
})
export class AddColumnButtonComponent {
  @Input() boardId?: string;
  @Output() addColumn = new EventEmitter<string>();

  onAddColumn() {
    this.addColumn.emit(this.boardId);
  }
}
