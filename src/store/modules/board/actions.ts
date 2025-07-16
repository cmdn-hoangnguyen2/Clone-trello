import type { ActionContext } from "vuex";
import {
  BOARD_TYPES,
  type AddNewTaskPayload,
  type BoardState,
  type DeleteTaskPayload,
  type UpdateTaskStatusPayload,
} from "./types";
import { fetchColumns } from "../../../api/fetchColumns";

export default {
  async [BOARD_TYPES.SET_COLUMNS]({ commit }: ActionContext<BoardState, any>) {
    const data = await fetchColumns();
    commit(BOARD_TYPES.SET_COLUMNS, data);
  },

  async [BOARD_TYPES.ADD_NEW_TASK](
    { commit }: ActionContext<BoardState, any>,
    payload: AddNewTaskPayload
  ) {
    commit(BOARD_TYPES.ADD_NEW_TASK, payload);
  },

  async [BOARD_TYPES.DELETE_TASK](
    { commit }: ActionContext<BoardState, any>,
    payload: DeleteTaskPayload
  ) {
    commit(BOARD_TYPES.DELETE_TASK, payload);
  },

  async [BOARD_TYPES.UPDATE_TASK_STATUS](
    { commit }: ActionContext<BoardState, any>,
    payload: UpdateTaskStatusPayload
  ) {
    commit(BOARD_TYPES.UPDATE_TASK_STATUS, payload);
  },
};
