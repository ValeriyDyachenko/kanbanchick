import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-item-button[columnId]',
  templateUrl: './add-item-button.component.html',
})
export class AddItemButtonComponent {
  @Input() columnId!: string;
  @Output() addItem = new EventEmitter<string>();

  onAddItem() {
    this.addItem.emit(this.columnId);
  }
}
