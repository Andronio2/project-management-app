export const BASEURL = 'http://127.0.0.1:4000';
// export const BASEURL = 'https://steppe-children.herokuapp.com';
// export const BASEURL = 'https://clammy-locket-production.up.railway.app';

export const TOKEN_KEY = 'AuthToken-SCh';

export const EXP_TIME = 8 * 3600;

export enum ModalType {
  CREATE = 'create',
  UPDATE = 'update',
  BOARD = 'board',
  COLUMN = 'column',
  TASK = 'task',
  USER = 'user',
}

export enum BoardLoadedState {
  unknown,
  loaded,
  error,
}
