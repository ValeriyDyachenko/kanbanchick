import { Observable } from 'rxjs';

export interface Api {
  boardsIds$: Observable<BoardsIds>;
  boards$: Observable<Boards>;
  columns$: Observable<Columns>;
  items$: Observable<Items>;
  itemDetails$: Observable<ItemDetails | null>;

  loadKanbanData: ApiCall<never>;
  loadItemDetails: ApiCall<Item['id']>;

  addBoard: ApiCall<Board>;
  addColumn: ApiCall<Board['id'], Column>;
  addItem: ApiCall<Column['id'], Item>;
  addDetails: ApiCall<ItemDetails>;

  patchBoardsIds: ApiCall<BoardsIds>;
  patchBoard: ApiCall<Pick<Board, 'id'> & Partial<Board>>;
  patchColumn: ApiCall<Pick<Column, 'id'> & Partial<Column>>;
  patchItem: ApiCall<Pick<Item, 'id'> & Partial<Item>>;
  patchDetails: ApiCall<Pick<ItemDetails, 'id'> & Partial<ItemDetails>>;

  deleteBoard: ApiCall<Board['id']>;
  deleteColumn: ApiCall<Column['id']>;
  deleteItem: ApiCall<Item['id']>;
}

export type BoardsIds = Board['id'][];
export type Boards = Record<Board['id'], Board>;
export type Columns = Record<Column['id'], Column>;
export type Items = Record<Item['id'], Item>;
export type ItemsDetails = Record<Item['id'], ItemDetails>;

export interface Board {
  id: string;
  title: string;
  columnsIds: string[];
}

export interface Column {
  id: string;
  title: string;
  itemsIds: string[];
}

export interface Item {
  id: string;
  title: string;
}

// ItemDetails id and Item id are equal
export type ItemDetails = { id: Item['id']; details: string } & Item;

type ApiCall<Arg1, Arg2 = void> = Arg2 extends void
  ? (arg1: Arg1) => void
  : (arg1: Arg1, arg2: Arg2) => void;
