import type { Column } from "../../../types/column";
import type { Task } from "../../../types/task";

export const BOARD_TYPES = {
  SET_COLUMNS: "SET_COLUMNS",
  ADD_NEW_TASK: "ADD_NEW_TASK",
  DELETE_TASK: "DELETE_TASK",
  EDIT_TASK: "EDIT_TASK",
  UPDATE_TASK_STATUS: "UPDATE_TASK_STATUS",
};

export interface BoardState {
  columns: Column[];
}

export interface UpdateTaskStatusPayload {
  taskId: number;
  fromColumnId: number;
  toColumnId: number;
}

export interface AddNewTaskPayload {
  task: Task;
  columnId: number;
}

export interface DeleteTaskPayload {
  taskId: number;
  columnId: number;
}
