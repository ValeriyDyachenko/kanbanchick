import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

export interface Kanban {
  boardIds: string[];
}

export interface Board {
  id: string;
  title: string;
  columnIds: string[];
}

export type Boards = Record<string, Board>;

export interface Column {
  id: string;
  title: string;
  itemIds: string[];
}

export interface Item {
  id: string;
  title: string;
}

export interface ItemDetails {
  id: string;
  details: string;
}

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  private kanbanSubject = new BehaviorSubject<Kanban>({ boardIds: [] });
  private boardsSubject = new BehaviorSubject<Boards>({});
  private columnsSubject = new BehaviorSubject<Column[]>([]); // TODO to Record?
  private itemsSubject = new BehaviorSubject<Item[]>([]); // TODO to Record?
  private itemsDetailsSubject = new BehaviorSubject<ItemDetails[]>([]); // TODO to Record?

  kanban$ = this.kanbanSubject.asObservable();
  boards$ = this.boardsSubject.asObservable();
  columns$ = this.columnsSubject.asObservable();
  items$ = this.itemsSubject.asObservable();
  itemDetails$ = this.itemsDetailsSubject.asObservable();

  constructor() {
    this.loadInitialData();
    this.setupStorageSubscriptions();
  }

  private setupStorageSubscriptions() {
    this.kanban$.subscribe((kanban) =>
      this.saveToLocalStorage('kanban', kanban),
    );
    this.boards$.subscribe((boards) =>
      this.saveToLocalStorage('boards', boards),
    );
    this.columns$.subscribe((columns) =>
      this.saveToLocalStorage('columns', columns),
    );
    this.items$.subscribe((items) => this.saveToLocalStorage('items', items));
    this.itemDetails$.subscribe((itemDetails) =>
      this.saveToLocalStorage('itemDetails', itemDetails),
    );
  }

  private saveToLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private loadInitialData() {
    const kanban: Kanban = this.getInitialKanban();
    const boards: Boards = this.getInitialBoards();
    const columns: Column[] = this.getInitialColumns();
    const items: Item[] = this.getInitialItems();
    const itemDetails: ItemDetails[] = this.getInitialItemDetails();

    this.kanbanSubject.next(kanban);
    this.boardsSubject.next(boards);
    this.columnsSubject.next(columns);
    this.itemsSubject.next(items);
    this.itemsDetailsSubject.next(itemDetails);
  }

  private getInitialKanban(): Kanban {
    return (
      JSON.parse(localStorage.getItem('kanban') || '') || {
        boardIds: ['board1'],
      }
    );
  }

  private getInitialBoards(): Boards {
    return (
      JSON.parse(localStorage.getItem('boards') || '') || {
        board1: {
          id: 'board1',
          title: '',
          columnIds: ['column1_1'],
        },
      }
    );
  }

  private getInitialColumns(): Column[] {
    return (
      JSON.parse(localStorage.getItem('columns') || '') || [
        {
          id: 'column1_1',
          title: '',
          itemIds: ['item1'],
        },
      ]
    );
  }

  private getInitialItems(): Item[] {
    return (
      JSON.parse(localStorage.getItem('items') || '') || [
        {
          id: 'item1',
          title: '',
        },
      ]
    );
  }

  private getInitialItemDetails(): ItemDetails[] {
    return (
      JSON.parse(localStorage.getItem('itemDetails') || '') || [
        {
          id: 'item1',
          details: '',
        },
      ]
    );
  }

  addBoard(
    board: Board = {
      id: `board_${Math.random()}`,
      title: '',
      columnIds: [],
    },
  ) {
    this.boardsSubject.next({
      ...this.boardsSubject.getValue(),
      [board.id]: board,
    });
    this.addColumnToBoard(board.id, undefined, { withItem: true });
    const kanban = this.kanbanSubject.getValue();
    this.kanbanSubject.next({
      ...kanban,
      boardIds: kanban.boardIds.concat(board.id),
    });
  }

  addItemToColumn(
    columnId: string,
    newItem: Item = {
      id: `item_${Math.random()}`,
      title: '',
    },
  ) {
    this.itemsSubject.next([...this.itemsSubject.getValue(), newItem]);
    this.itemsDetailsSubject.next([
      ...this.itemsDetailsSubject.getValue(),
      { id: newItem.id, details: '' },
    ]);

    const updatedColumns = this.columnsSubject.getValue().map((column) => {
      if (column.id === columnId) {
        return { ...column, itemIds: [...column.itemIds, newItem.id] };
      }
      return column;
    });
    this.columnsSubject.next(updatedColumns);
  }

  addColumnToBoard(
    boardId: string,
    newColumn: Column = {
      id: `column_${Math.random()}`,
      title: '',
      itemIds: [],
    },
    options: { withItem?: boolean } = {},
  ) {
    this.columnsSubject.next([...this.columnsSubject.getValue(), newColumn]);
    const boards = this.boardsSubject.getValue();
    const board = boards[boardId];
    if (boardId) {
      this.boardsSubject.next({
        ...boards,
        [boardId]: {
          ...board,
          columnIds: [...board.columnIds, newColumn.id],
        },
      });
    } else {
      console.error(`[addColumnToBoard]: Board ${boardId} not found`);
    }
    if (options.withItem) {
      this.addItemToColumn(newColumn.id);
    }
  }

  getItemById(id: string) {
    return this.items$.pipe(
      map((items) => items.find((item) => item.id === id)),
    );
  }

  getBoardIds() {
    return this.kanban$.pipe(map((kanban) => kanban.boardIds));
  }

  getItemDetailsById(id: string) {
    return combineLatest([this.itemsSubject, this.itemsDetailsSubject]).pipe(
      map(([items, details]) => {
        const item = items.find((i) => i.id === id);
        const detail = details.find((d) => d.id === id);

        return {
          title: item?.title || '',
          details: detail?.details || '',
        };
      }),
    );
  }

  patchItem(itemId: string | null, partialData: Partial<Item>) {
    if (!itemId) {
      return;
    }
    const currentItems = this.itemsSubject.getValue();
    const itemIndex = currentItems.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      const updatedItems = [...currentItems];
      updatedItems[itemIndex] = { ...updatedItems[itemIndex], ...partialData };
      this.itemsSubject.next(updatedItems);
    }
  }

  patchItemDetails(itemId: string | null, partialData: Partial<ItemDetails>) {
    if (!itemId) {
      return;
    }
    const currentItemDetails = this.itemsDetailsSubject.getValue();
    const itemDetailsIndex = currentItemDetails.findIndex(
      (detail) => detail.id === itemId,
    );
    if (itemDetailsIndex !== -1) {
      const updatedItemDetails = [...currentItemDetails];
      updatedItemDetails[itemDetailsIndex] = {
        ...updatedItemDetails[itemDetailsIndex],
        ...partialData,
      };
      this.itemsDetailsSubject.next(updatedItemDetails);
    }
  }

  patchColumn(columnId: string, data: Partial<Column>) {
    const currentColumns = this.columnsSubject.getValue();
    const columnIndex = currentColumns.findIndex(
      (column) => column.id === columnId,
    );

    if (columnIndex !== -1) {
      const updatedColumns = [...currentColumns];
      updatedColumns[columnIndex] = {
        ...updatedColumns[columnIndex],
        ...data,
      };
      this.columnsSubject.next(updatedColumns);
    }
  }

  patchBoard(boardId: string, data: Partial<Board>) {
    const currentBoards = this.boardsSubject.getValue();
    if (!currentBoards[boardId]) {
      const updatedBoards = {
        ...currentBoards,
        [boardId]: {
          ...currentBoards[boardId],
          ...data,
        },
      };
      this.boardsSubject.next(updatedBoards);
    }
  }

  deleteItemDetails(id: string): void {
    const currentDetails = this.itemsDetailsSubject.getValue();
    const updatedDetails = currentDetails.filter((detail) => detail.id !== id);
    this.itemsDetailsSubject.next(updatedDetails);

    const currentColumns = this.columnsSubject.getValue();
    const updatedColumns = currentColumns.map((column) => {
      return {
        ...column,
        itemIds: column.itemIds.filter((itemId) => itemId !== id),
      };
    });
    this.columnsSubject.next(updatedColumns);
  }

  deleteItem(id: string): void {
    this.deleteItemDetails(id);

    const currentItems = this.itemsSubject.getValue();
    const updatedItems = currentItems.filter((item) => item.id !== id);
    this.itemsSubject.next(updatedItems);
  }

  deleteColumn(id: string): void {
    const currentColumns = this.columnsSubject.getValue();
    const columnToDelete = currentColumns.find((column) => column.id === id);
    const columnsToUpdate = currentColumns.filter((column) => column.id !== id);
    columnToDelete?.itemIds.forEach((itemId) => this.deleteItem(itemId));
    this.columnsSubject.next(columnsToUpdate);
    const updatedBoards = Object.fromEntries(
      Object.entries({ ...this.boardsSubject.getValue() }).map(
        ([boardId, board]) => [
          boardId,
          {
            ...board,
            columnIds: board.columnIds.filter((columnId) => columnId !== id),
          },
        ],
      ),
    );
    this.boardsSubject.next(updatedBoards);
  }

  deleteBoard(id: string): void {
    const boards = { ...this.boardsSubject.getValue() };
    const boardToDelete = boards[id];
    boardToDelete?.columnIds.forEach((columnId) => this.deleteColumn(columnId));
    delete boards[id];
    this.boardsSubject.next(boards);
    const kanban = this.kanbanSubject.getValue();
    this.kanbanSubject.next({
      ...kanban,
      boardIds: kanban.boardIds.filter((boardId) => boardId !== id),
    });
  }
}
