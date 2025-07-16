import { ref } from "vue";
import { useStore } from "vuex";
import {
  BOARD_TYPES,
  type AddNewTaskPayload,
} from "../store/modules/board/types";

export const useAddTask = () => {
  const store = useStore();
  const loading = ref(false);

  const addNewTask = async ({ task, columnId }: AddNewTaskPayload) => {
    try {
      loading.value = true;
      await store.dispatch(BOARD_TYPES.ADD_NEW_TASK, { task, columnId });
    } catch (error) {
      throw new Error("Failed to add new task: " + error);
    } finally {
      loading.value = false;
    }
  };

  return {
    addNewTask,
    loading,
  };
};
