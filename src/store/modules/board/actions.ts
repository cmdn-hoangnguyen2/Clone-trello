import type { ActionContext } from "vuex";
import { BOARD_MUTATIONS } from "./mutations";
import type { BoardState, UpdateTaskStatusPayload } from "./types";
import { fetchColumns } from "../../../api/fetchColumns";

export const BOARD_ACTIONS = {
  SET_COLUMNS: "SET_COLUMNS",
  UPDATE_TASK_STATUS: "UPDATE_TASK_STATUS",
};

export default {
  async [BOARD_ACTIONS.SET_COLUMNS]({
    commit,
  }: ActionContext<BoardState, any>) {
    const data = await fetchColumns();
    commit(BOARD_MUTATIONS.SET_COLUMNS, data);
  },

  async [BOARD_ACTIONS.UPDATE_TASK_STATUS](
    { commit }: ActionContext<BoardState, any>,
    payload: UpdateTaskStatusPayload
  ) {
    commit(BOARD_MUTATIONS.UPDATE_TASK_STATUS, payload);
  },
};
