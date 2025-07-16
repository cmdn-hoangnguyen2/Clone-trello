import { useStore } from "vuex";
import {
  BOARD_TYPES,
  type UpdateTaskStatusPayload,
} from "../store/modules/board/types";
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
      await store.dispatch(BOARD_TYPES.UPDATE_TASK_STATUS, {
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
