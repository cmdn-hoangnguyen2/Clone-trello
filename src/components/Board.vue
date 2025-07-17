<script setup lang="ts">
import draggableComponent from "vuedraggable";
import type { Column } from "../types/column";
import CardTask from "./CardTask.vue";
import { useAddTask } from "../hooks/useAddTask";
import { ref } from "vue";
import CardAddTask from "./CardAddTask.vue";
import { mapColumnIdToStatus } from "../utils/mapColumnIdToStatus";
import type { Task } from "../types/task";

const props = defineProps<{ column: Column }>();
const emit = defineEmits(["task-add", "task-remove", "view-task"]);

const { addNewTask } = useAddTask();

const isAddingTask = ref(false);
const newTask = ref({
  id: Date.now(),
  title: "",
  description: "",
  columnId: props.column.id,
  status: mapColumnIdToStatus(props.column.id),
  createdAt: new Date().toISOString(),
});

const onProcessingNewTask = () => {
  isAddingTask.value = true;
};

const onSubmitNewTask = async (title: string) => {
  await addNewTask({
    task: {
      ...newTask.value,
      title,
      description: "",
      createdAt: new Date().toISOString(),
    },
    columnId: props.column.id,
  });

  isAddingTask.value = false;
};

const handleViewTask = (task: Task) => {
  emit("view-task", task);
};
</script>

<template>
  <div
    class="board col-span-1 bg-white rounded-xl shadow-md w-full p-4 flex flex-col"
  >
    <div class="board-header flex justify-between items-center mb-4">
      <h2 class="board-title text-lg font-semibold text-gray-800">
        {{ column.name }}
      </h2>

      <button
        class="button-show-card-new-task"
        type="button"
        @click="onProcessingNewTask"
        :isDisable="isAddingTask"
      >
        <i class="pi pi-plus"></i>
      </button>
    </div>
    <div class="h-full flex flex-col gap-2">
      <CardAddTask v-show="isAddingTask" @submit-add-task="onSubmitNewTask" />

      <draggableComponent
        class="draggable-component h-full flex flex-col gap-2"
        item-key="id"
        group="tasks"
        :list="column.tasks"
        :tag="'div'"
        :data-column-id="column.id"
        @add="emit('task-add', $event)"
        @remove="emit('task-remove', $event)"
      >
        <template #item="{ element }">
          <CardTask :task="element" @view-detail="handleViewTask" />
        </template>
      </draggableComponent>

      <template>
        <div
          class="board-empty-column-text text-sm text-gray-400 italic"
          v-if="!column.tasks.length"
        >
          No tasks
        </div>
      </template>
    </div>
  </div>
</template>
