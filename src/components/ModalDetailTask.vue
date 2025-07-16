<script setup lang="ts">
import { useDeleteTask } from "../hooks/useDeleteTask";
import type { Task } from "../types/task";
import BaseModal from "./BaseModal.vue";
import ButtonIcon from "./ButtonIcon.vue";

const props = defineProps<{
  isOpen: boolean;
  task: Task | null;
}>();
const emit = defineEmits(["close-modal"]);

const { deleteTask } = useDeleteTask();

const handleCloseModal = () => {
  emit("close-modal");
};

const handleDeleteTask = () => {
  const taskId = props.task?.id;
  const columnId = props.task?.columnId;

  if (!taskId || !columnId) return;

  deleteTask({
    taskId,
    columnId,
  });

  handleCloseModal();
};
</script>

<template>
  <BaseModal
    :isOpen="isOpen"
    @close-modal="handleCloseModal"
    :isShadowBackground="true"
  >
    <h2 class="text-xl font-bold text-gray-800">{{ task?.title }}</h2>

    <div class="grid grid-cols-12">
      <div class="col-span-9 flex flex-col gap-2 p-3">
        <p>{{ task?.description }}</p>
      </div>

      <div class="col-span-3 flex flex-col gap-2 p-3">
        <ButtonIcon
          label="Delete"
          icon="trash"
          class="text-white bg-red-400"
          @on-click="handleDeleteTask"
        />
      </div>
    </div>
  </BaseModal>
</template>
