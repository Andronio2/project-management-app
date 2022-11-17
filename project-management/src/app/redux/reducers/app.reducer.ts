import { boardStatusReducer } from './board-stat.reducer';
import { boardReducer } from './board.reducer';
import { markTaskReducer } from './mark-task.reducer';
import { userReducer } from './user.reducer';

export const appReducer = {
  user: userReducer,
  board: boardReducer,
  boardLoaded: boardStatusReducer,
  markTask: markTaskReducer,
};
