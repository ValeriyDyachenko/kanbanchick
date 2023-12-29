import { Boards, BoardsIds, Columns, Items } from '~/api/api.type';

export const DEFAULT_BOARDS_IDS: BoardsIds = ['board1_1'];

export const DEFAULT_BOARDS: Boards = {
  board1_1: { id: 'board1_1', title: '', columnsIds: ['column1_1'] },
};

export const DEFAULT_COLUMNS: Columns = {
  column1_1: { id: 'column1_1', title: '', itemsIds: ['item1'] },
};

export const DEFAULT_ITEMS: Items = {
  item1: {
    id: 'item1',
    title: '',
  },
};
