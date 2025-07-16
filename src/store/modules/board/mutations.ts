import type { Column } from "../../../types/column";
import { mapColumnIdToStatus } from "../../../utils/mapColumnIdToStatus";
import {
  BOARD_TYPES,
  type AddNewTaskPayload,
  type BoardState,
  type DeleteTaskPayload,
  type UpdateTaskStatusPayload,
} from "./types";

export default {
  [BOARD_TYPES.SET_COLUMNS](state: BoardState, payload: Column[]) {
    state.columns = payload;
  },

  [BOARD_TYPES.ADD_NEW_TASK](state: BoardState, payload: AddNewTaskPayload) {
    const columnIndex = state.columns.findIndex(
      (column) => column.id === payload.columnId
    );
    state.columns[columnIndex].tasks.push(payload.task);
  },

  [BOARD_TYPES.DELETE_TASK](state: BoardState, payload: DeleteTaskPayload) {
    const columnIndex = state.columns.findIndex(
      (column) => column.id === payload.columnId
    );
    if (columnIndex === -1) return;

    const tasks = state.columns[columnIndex].tasks;
    const taskIndex = tasks.findIndex((task) => task.id === payload.taskId);

    if (taskIndex === -1) return;

    tasks.splice(taskIndex, 1);
  },

  [BOARD_TYPES.UPDATE_TASK_STATUS](
    state: BoardState,
    payload: UpdateTaskStatusPayload
  ) {
    if (payload.fromColumnId === payload.toColumnId) return;

    const toColumnIndex = state.columns.findIndex(
      (column) => column.id === payload.toColumnId
    );

    const tasksOfToColumn = [...state.columns[toColumnIndex].tasks];
    const taskIndex = tasksOfToColumn.findIndex(
      (task) => task.id === payload.taskId
    );

    if (taskIndex === -1) return;

    const updatedTask = {
      ...tasksOfToColumn[taskIndex],
      columnId: payload.toColumnId,
      status: mapColumnIdToStatus(payload.toColumnId),
    };

    tasksOfToColumn.push(updatedTask);
  },
};
