import { createStore } from "vuex";
import { boardModule } from "./modules/board";

export const store = createStore({
  modules: {
    board: boardModule,
  },
});
