import { BOARD_PATH } from '~/app-routing.module';

export type RouterState = {
  state: {
    from?: typeof BOARD_PATH;
  };
};
