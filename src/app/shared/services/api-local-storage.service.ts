import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import {
  Api,
  Board,
  Boards,
  Columns,
  ItemsDetails,
  Item,
  Items,
  BoardsIds,
  ItemDetails,
  Column,
} from '~/api/api.type';
import {
  DEFAULT_BOARDS,
  DEFAULT_BOARDS_IDS,
  DEFAULT_COLUMNS,
  DEFAULT_ITEMS,
} from '~/api/default-values';

const BOARDS_IDS_LS_KEY = 'boardsIds';
const BOARDS_LS_KEY = 'boards';
const COLUMNS_LS_KEY = 'columns';
const ITEMS_LS_KEY = 'items';
const ITEMS_DETAILS_LS_KEY = 'itemsDetails';

@Injectable({
  providedIn: 'root',
})
export class ApiLocalStorageService implements Api {
  private boardsIdsSubject = new BehaviorSubject<BoardsIds>([]);
  private boardsSubject = new BehaviorSubject<Boards>({});
  private columnsSubject = new BehaviorSubject<Columns>({});
  private itemsSubject = new BehaviorSubject<Items>({});
  private itemDetailsSubject = new BehaviorSubject<ItemDetails | null>(null);

  public readonly boardsIds$ = this.boardsIdsSubject.asObservable();
  public readonly boards$ = this.boardsSubject.asObservable();
  public readonly columns$ = this.columnsSubject.asObservable();
  public readonly items$ = this.itemsSubject.asObservable();

  // for view, it's combine 'item data' and 'item details data', but store it separately
  public readonly itemDetails$ = this.itemDetailsSubject.asObservable();

  loadKanbanData() {
    this.loadEntry(ITEMS_LS_KEY, this.itemsSubject, DEFAULT_ITEMS);
    this.loadEntry(COLUMNS_LS_KEY, this.columnsSubject, DEFAULT_COLUMNS);
    this.loadEntry(BOARDS_LS_KEY, this.boardsSubject, DEFAULT_BOARDS);
    this.loadEntry(
      BOARDS_IDS_LS_KEY,
      this.boardsIdsSubject,
      DEFAULT_BOARDS_IDS,
    );
  }

  loadItemDetails(itemId: Item['id']) {
    this.loadEntry(ITEMS_LS_KEY, this.itemsSubject, DEFAULT_ITEMS);
    const item = this.getFromLS<Items>(ITEMS_LS_KEY)?.[itemId];

    const itemDetails =
      this.getFromLS<ItemsDetails>(ITEMS_DETAILS_LS_KEY)?.[itemId];

    item
      ? this.itemDetailsSubject.next({ details: '', ...item, ...itemDetails })
      : this.itemDetailsSubject.next(null);
  }

  addBoard(
    board: Board = { id: `board_${uuidv4()}`, columnsIds: [], title: '' },
  ) {
    const boards = this.getFromLS<Boards>(BOARDS_LS_KEY) || {};
    boards[board.id] = board;
    this.saveToLS(BOARDS_LS_KEY, boards);
    this.boardsSubject.next(boards);

    const boardsIds = this.getFromLS<BoardsIds>(BOARDS_IDS_LS_KEY) || [];
    const updatedBoardsIds = [...boardsIds, board.id];
    this.saveToLS(BOARDS_IDS_LS_KEY, updatedBoardsIds);
    this.boardsIdsSubject.next(updatedBoardsIds);
  }

  addColumn(
    boardId: Board['id'],
    column: Column = { id: `column_${uuidv4()}`, itemsIds: [], title: '' },
  ) {
    const board = (this.getFromLS<Boards>(BOARDS_LS_KEY) || {})[boardId];
    if (!board) {
      console.error(`addColumn; board ${boardId} not found`);
      return;
    }

    const columns = this.getFromLS<Columns>(COLUMNS_LS_KEY) || {};
    columns[column.id] = column;
    this.saveToLS(COLUMNS_LS_KEY, columns);
    this.columnsSubject.next(columns);

    this.patchBoard({ ...board, columnsIds: [...board.columnsIds, column.id] });
  }

  addItem(
    columnId: Column['id'],
    item: Item = { id: `item_${uuidv4()}`, title: '' },
  ) {
    const column = (this.getFromLS<Columns>(COLUMNS_LS_KEY) || {})[columnId];
    if (!column) {
      console.error(`addItem; column ${columnId} not found`);
      return;
    }

    const items = this.getFromLS<Items>(ITEMS_LS_KEY) || {};
    items[item.id] = item;
    this.saveToLS(ITEMS_LS_KEY, items);
    this.itemsSubject.next(items);

    this.patchColumn({ ...column, itemsIds: [...column.itemsIds, item.id] });
  }

  addDetails(details: ItemDetails) {
    const itemsDetails =
      this.getFromLS<ItemsDetails>(ITEMS_DETAILS_LS_KEY) || {};
    itemsDetails[details.id] = details;
    this.saveToLS(ITEMS_DETAILS_LS_KEY, itemsDetails);
    this.itemDetailsSubject.next(details);
  }

  patchBordersIds(boardsIds: BoardsIds) {
    this.saveToLS(BOARDS_IDS_LS_KEY, boardsIds);
    this.boardsIdsSubject.next(boardsIds);
  }

  patchBoard = (board: Pick<Board, 'id'> & Partial<Board>) => {
    const boards = this.getFromLS<Boards>(BOARDS_LS_KEY) || {};
    if (!boards[board.id]) {
      console.error(`patchBoard ${board.id} not found`);
      return;
    }
    boards[board.id] = { ...boards[board.id], ...board };
    this.saveToLS(BOARDS_LS_KEY, boards);
    this.boardsSubject.next(boards);
  };

  patchColumn(column: Pick<Column, 'id'> & Partial<Column>) {
    const columns = this.getFromLS<Columns>(COLUMNS_LS_KEY) || {};
    if (!columns[column.id]) {
      console.error(`patchColumn ${column.id} not found`);
      return;
    }
    columns[column.id] = { ...columns[column.id], ...column };
    this.saveToLS(COLUMNS_LS_KEY, columns);
    this.columnsSubject.next(columns);
  }

  patchItem(item: Pick<Item, 'id'> & Partial<Item>) {
    const items = this.getFromLS<Items>(ITEMS_LS_KEY) || {};
    if (!items[item.id]) {
      console.error(`patchItem ${item.id} not found`);
      return;
    }
    items[item.id] = { ...items[item.id], ...item };
    this.saveToLS(ITEMS_LS_KEY, items);
    this.itemsSubject.next(items);
  }

  patchDetails(details: Pick<ItemDetails, 'id'> & Partial<ItemDetails>) {
    const itemsDetails =
      this.getFromLS<ItemsDetails>(ITEMS_DETAILS_LS_KEY) || {};
    itemsDetails[details.id] = {
      ...itemsDetails[details.id],
      ...details,
    };
    this.saveToLS(ITEMS_DETAILS_LS_KEY, itemsDetails);
    const item = this.getFromLS<Items>(ITEMS_LS_KEY)?.[details.id];
    this.itemDetailsSubject.next({
      ...item,
      ...itemsDetails[details.id],
      ...details,
    });
  }

  deleteBoard(boardId: Board['id']) {
    const board = (this.getFromLS<Boards>(BOARDS_LS_KEY) || {})[boardId];
    if (!board) {
      console.error(`deleteBoard ${boardId} not found`);
      return;
    }

    const columns = this.getFromLS<Columns>(COLUMNS_LS_KEY) || {};
    board.columnsIds.forEach((columnId) => {
      const columnItems = columns[columnId];
      columnItems.itemsIds.forEach((itemId) => {
        this.deleteItem(itemId);
      });
      this.deleteColumn(columnId);
    });

    const boardsIds = (
      this.getFromLS<BoardsIds>(BOARDS_IDS_LS_KEY) || []
    ).filter((id) => id !== board.id);
    this.saveToLS(BOARDS_IDS_LS_KEY, boardsIds);
    this.boardsIdsSubject.next(boardsIds);

    const boards = this.getFromLS<Boards>(BOARDS_LS_KEY) || {};
    delete boards[board.id];
    this.saveToLS(BOARDS_LS_KEY, boards);
    this.boardsSubject.next(boards);
  }

  deleteColumn(columnId: Column['id']) {
    const column = (this.getFromLS<Columns>(COLUMNS_LS_KEY) || {})[columnId];
    if (!column) {
      console.error(`deleteColumn ${columnId} not found`);
      return;
    }

    let boards = this.getFromLS<Boards>(BOARDS_LS_KEY) || {};
    const board = Object.values(boards).find((board) => {
      return board.columnsIds.includes(columnId);
    });
    if (!board) {
      console.error(`deleteColumn ${columnId}, board not found`);
    } else {
      board.columnsIds = board.columnsIds.filter((id) => id !== columnId);
      boards = {
        ...boards,
        [board.id]: board,
      };
      this.saveToLS(BOARDS_LS_KEY, boards);
      this.boardsSubject.next(boards);
    }

    column.itemsIds.forEach((itemId) => {
      this.deleteItem(itemId);
    });

    const columns = this.getFromLS<Columns>(COLUMNS_LS_KEY) || {};
    delete columns[column.id];
    this.saveToLS(COLUMNS_LS_KEY, columns);
    this.columnsSubject.next(columns);
  }

  deleteItem(itemId: Item['id']) {
    const item = (this.getFromLS<Items>(ITEMS_LS_KEY) || {})[itemId];
    if (!item) {
      console.error(`deleteItem ${itemId} not found`);
      return;
    }

    let columns = this.getFromLS<Columns>(COLUMNS_LS_KEY) || {};
    const column = Object.values(columns).find((column) => {
      return column.itemsIds.includes(itemId);
    });
    if (!column) {
      console.error(`deleteItem ${itemId}, column not found`);
    } else {
      column.itemsIds = column.itemsIds.filter((id) => id !== itemId);
      columns = {
        ...columns,
        [column.id]: column,
      };
      this.saveToLS(COLUMNS_LS_KEY, columns);
      this.columnsSubject.next(columns);
    }

    const itemDetails =
      this.getFromLS<ItemsDetails>(ITEMS_DETAILS_LS_KEY) || {};
    delete itemDetails[itemId];
    this.saveToLS(ITEMS_DETAILS_LS_KEY, itemDetails);
    if (this.itemDetailsSubject.getValue()?.id === itemId) {
      this.itemDetailsSubject.next(null);
    }

    const items = this.getFromLS<Items>(ITEMS_LS_KEY) || {};
    delete items[itemId];
    this.saveToLS(ITEMS_LS_KEY, items);
    this.itemsSubject.next(items);
  }

  private loadEntry<T>(
    lsKey: string,
    subject: BehaviorSubject<T>,
    defaultValue: T,
  ): void {
    const dataInLS = this.getFromLS<T>(lsKey);
    if (!dataInLS) {
      this.saveToLS(lsKey, defaultValue);
      subject.next(defaultValue);
    } else {
      subject.next(dataInLS);
    }
  }

  private getFromLS<T>(key: string): T | null {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }

  private saveToLS(key: string, data: unknown) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
