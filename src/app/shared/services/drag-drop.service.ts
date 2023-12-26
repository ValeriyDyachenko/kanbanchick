import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { Board, Column } from '~/api/types';
import { ApiLocalStorageService } from '~/shared/services/api-local-storage.service';

export interface ItemsInColumnDragDrop {
  column: Column;
  otherColumnIds: string[];
}

export interface ColumnsInBoardDragDrop {
  board: Board;
  otherBoardIds: string[];
}

@Injectable({
  providedIn: 'root',
})
export class DragDropService {
  private ItemsInColumnDragDropStore: Map<
    string,
    Observable<ItemsInColumnDragDrop | null>
  > = new Map();

  private columnsInBoardDragDropStore: Map<
    string,
    Observable<ColumnsInBoardDragDrop | null>
  > = new Map();

  constructor(private api: ApiLocalStorageService) {}

  getItemsInsideColumnDragDrop$(
    columnId: string,
  ): Observable<ItemsInColumnDragDrop | null> {
    return this.ItemsInColumnDragDropStore.get(columnId) || of(null);
  }

  initItemsInColumnDragDropSubscription(
    columnId: string,
  ): Observable<ItemsInColumnDragDrop | null> {
    if (!this.ItemsInColumnDragDropStore.has(columnId)) {
      const columnDragDrop$ = this.api.columns$.pipe(
        map((columns) => {
          const column = columns[columnId];
          if (!column) {
            throw new Error(`DragDrop: Column with id ${columnId} not found`);
          }
          const otherColumnIds = Object.keys(columns).filter(
            (id) => id !== columnId,
          );
          return { column, otherColumnIds };
        }),
        catchError((error) => {
          console.error(error);
          return of(null);
        }),
        finalize(() => this.ItemsInColumnDragDropStore.delete(columnId)),
      );
      this.ItemsInColumnDragDropStore.set(columnId, columnDragDrop$);
    }
    return this.ItemsInColumnDragDropStore.get(
      columnId,
    ) as Observable<ItemsInColumnDragDrop>;
  }

  initColumnsInBoardDragDropSubscription(
    boardId: string,
  ): Observable<ColumnsInBoardDragDrop | null> {
    if (!this.columnsInBoardDragDropStore.has(boardId)) {
      const boardDragDrop$ = this.api.boards$.pipe(
        map((boards) => {
          const board = boards[boardId];
          if (!boards[boardId]) {
            throw new Error(`DragDrop: Board with id ${boardId} not found`);
          }
          const otherBoardIds = Object.values(boards).reduce(
            (ids, board) => (board.id !== boardId ? ids.concat(board.id) : ids),
            [] as string[],
          );
          return { board, otherBoardIds };
        }),
        catchError((error) => {
          console.error(error);
          return of(null);
        }),
        finalize(() => this.columnsInBoardDragDropStore.delete(boardId)),
      );
      this.columnsInBoardDragDropStore.set(boardId, boardDragDrop$);
    }
    return this.columnsInBoardDragDropStore.get(
      boardId,
    ) as Observable<ColumnsInBoardDragDrop>;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
