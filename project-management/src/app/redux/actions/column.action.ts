import { createAction, props } from '@ngrx/store';
import { IColumn, IColumnDto, IUpdateColumnDto } from 'src/app/share/models/column.model';

export namespace ColumnActions {
  export const getAllColumnsAction = createAction(
    '[COLUMN] Get all columns',
    props<{ boardId: string }>(),
  );
  export const allColumnsLoadedAction = createAction(
    '[COLUMN] All columns loaded',
    props<{ columns: IColumn[] }>(),
  );

  export const getColumnByIdAction = createAction(
    '[COLUMN] Get column by id',
    props<{ boardId: string; columnId: string }>(),
  );
  export const columnLoadedAction = createAction(
    '[COLUMN] Column loaded',
    props<{ columnId: string; column: IColumn }>(),
  );

  export const createColumnAction = createAction(
    '[COLUMN] Create new column',
    props<{ boardId: string; column: IColumnDto }>(),
  );

  export const deleteColumnAction = createAction(
    '[COLUMN] Delete column',
    props<{ boardId: string; columnId: string }>(),
  );

  export const updateColumnAction = createAction(
    '[COLUMN] Update column',
    props<{ boardId: string; columnId: string; column: IUpdateColumnDto }>(),
  );
}
