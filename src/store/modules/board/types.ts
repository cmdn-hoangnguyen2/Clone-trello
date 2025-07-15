import type { Column } from "../../../types/column";

export interface BoardState {
  columns: Column[];
}

export interface UpdateTaskStatusPayload {
  taskId: number;
  fromColumnId: number;
  toColumnId: number;
}
