import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import { computed } from "vue";
import type { Column } from "../types/column";
import { BOARD_ACTIONS } from "../store/modules/board/actions";

export const useBoardColumns = () => {
  const store = useStore();
  const loading = ref(false);
  const columns = computed<Column[]>(() => store.state.board.columns);

  const fetchColumns = async () => {
    try {
      loading.value = true;
      await store.dispatch(BOARD_ACTIONS.SET_COLUMNS);
    } catch (error) {
      throw new Error("Failed to fetch columns: " + error);
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchColumns);

  return {
    columns,
    loading,
  };
};
