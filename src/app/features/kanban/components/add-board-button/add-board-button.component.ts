import { ChangeDetectionStrategy, Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Board } from '~/api/types';
import { ApiLocalStorageService } from '~/shared/services/api-local-storage.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-board-button',
  templateUrl: './add-board-button.component.html',
})
export class AddBoardButtonComponent {
  constructor(private apiDataService: ApiLocalStorageService) {}
  addBoard() {
    const item = {
      id: `item_${uuidv4()}`,
      title: '',
    };
    const column = {
      id: `column_${uuidv4()}`,
      itemsIds: [],
      title: '',
    };
    const board: Board = {
      id: `board_${uuidv4()}`,
      columnsIds: [],
      title: '',
    };
    this.apiDataService.addBoard(board);
    this.apiDataService.addColumn(board.id, column);
    this.apiDataService.addItem(column.id, item);
  }
}
