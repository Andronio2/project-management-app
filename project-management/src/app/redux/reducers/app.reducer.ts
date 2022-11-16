import { boardStatusReducer } from './board-stat.reducer';
import { allBoardsReducer } from './all-boards.reducer';
import { userReducer } from './user.reducer';
import { combineReducers } from '@ngrx/store';
import { currBoardReducer } from './curr-board.reducer';

export const appReducer = {
  user: userReducer,
  board: combineReducers({ allBoards: allBoardsReducer, currBoard: currBoardReducer }),
  boardLoaded: boardStatusReducer,
};
