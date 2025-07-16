import { ref } from "vue";
import { useStore } from "vuex";
import {
  BOARD_TYPES,
  type DeleteTaskPayload,
} from "../store/modules/board/types";

export const useDeleteTask = () => {
  const store = useStore();
  const loading = ref(false);

  const deleteTask = async ({ taskId, columnId }: DeleteTaskPayload) => {
    try {
      loading.value = true;
      await store.dispatch(BOARD_TYPES.DELETE_TASK, { taskId, columnId });
    } catch (error) {
      throw new Error("Failed to delete a task: " + error);
    } finally {
      loading.value = false;
    }
  };

  return {
    deleteTask,
    loading,
  };
};
