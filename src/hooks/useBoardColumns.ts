import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import { computed } from "vue";
import type { Column } from "../types/column";
import { BOARD_TYPES } from "../store/modules/board/types";

export const useBoardColumns = () => {
  const store = useStore();
  const loading = ref(false);
  const columns = computed<Column[]>(() => store.state.board.columns);

  const fetchColumns = async () => {
    try {
      loading.value = true;
      await store.dispatch(BOARD_TYPES.SET_COLUMNS);
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
