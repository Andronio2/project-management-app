import { boardStatusReducer } from './board-stat.reducer';
import { boardReducer } from './board.reducer';
import { userReducer } from './user.reducer';

export const appReducer = {
  user: userReducer,
  board: boardReducer,
  boardLoaded: boardStatusReducer,
};
