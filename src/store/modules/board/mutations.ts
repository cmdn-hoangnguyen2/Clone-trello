import type { Column } from "../../../types/column";
import { mapColumnIdToStatus } from "../../../utils/mapColumnIdToStatus.ts";
import type { BoardState, UpdateTaskStatusPayload } from "./types";

export const BOARD_MUTATIONS = {
  SET_COLUMNS: "SET_COLUMNS",
  UPDATE_TASK_STATUS: "UPDATE_TASK_STATUS",
};

export default {
  [BOARD_MUTATIONS.SET_COLUMNS](state: BoardState, payload: Column[]) {
    state.columns = payload;
  },

  [BOARD_MUTATIONS.UPDATE_TASK_STATUS](
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

    console.log(updatedTask);
    tasksOfToColumn.push(updatedTask);
  },
};
