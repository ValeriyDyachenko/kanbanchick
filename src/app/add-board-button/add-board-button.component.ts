import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-board-button',
  templateUrl: './add-board-button.component.html',
})
export class AddBoardButtonComponent {
  @Output() addBoard = new EventEmitter<string>();

  onAddBoard() {
    this.addBoard.emit();
  }
}
