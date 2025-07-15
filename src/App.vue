<script setup lang="ts">
import Board from "./components/Board.vue";
import { useBoardColumns } from "./hooks/useBoardColumns";
import { useUpdateTaskStatus } from "./hooks/useUpdateTaskStatus";
import { ref } from "vue";

const { columns } = useBoardColumns();
const { updateTaskStatus } = useUpdateTaskStatus();

const fromColumnId = ref<number | null>(null);

const handleRemove = (event: any) => {
  const columnId = Number(event?.from?.dataset?.columnId);

  if (!isNaN(columnId)) {
    fromColumnId.value = columnId;
  }
};

const handleAdd = async (event: any, toColumnId: number) => {
  const taskId = event?.item?.__draggable_context?.element?.id;
  fromColumnId.value = event?.item?.__draggable_context?.element?.columnId;

  if (!taskId || !fromColumnId.value) return;

  await updateTaskStatus({
    taskId,
    fromColumnId: fromColumnId.value,
    toColumnId,
  });

  fromColumnId.value = null;
};
</script>

<template>
  <div class="grid grid-cols-5 p-4 gap-4 overflow-x-auto bg-gray-100 h-screen">
    <Board
      v-for="column in columns"
      :key="column.id"
      :column="column"
      @task-add="(event: any) => handleAdd(event, column.id)"
      @task-remove="handleRemove"
    />
  </div>
</template>
