import actions from "./actions";
import mutations from "./mutations";
import type { BoardState } from "./types";

export const boardModule = {
  state: (): BoardState => ({
    columns: [],
  }),
  mutations,
  actions,
};
