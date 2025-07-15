import { useStore } from "vuex";
import type { UpdateTaskStatusPayload } from "../store/modules/board/types";
import { BOARD_ACTIONS } from "../store/modules/board/actions";
import { ref } from "vue";

export const useUpdateTaskStatus = () => {
  const store = useStore();
  const loading = ref(false);

  const updateTaskStatus = async ({
    taskId,
    fromColumnId,
    toColumnId,
  }: UpdateTaskStatusPayload) => {
    try {
      loading.value = true;

      await store.dispatch(BOARD_ACTIONS.UPDATE_TASK_STATUS, {
        taskId,
        fromColumnId,
        toColumnId,
      });
    } catch (error) {
      throw new Error("Failed to update task status: " + error);
    } finally {
      loading.value = false;
    }
  };

  return {
    updateTaskStatus,
    loading,
  };
};
