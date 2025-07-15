<script setup lang="ts">
import draggableComponent from "vuedraggable";
import type { Column } from "../types/column";
import BoardTaskCard from "./BoardTaskCard.vue";

defineProps<{ column: Column }>();
const emit = defineEmits(["task-add", "task-remove"]);
</script>

<template>
  <div
    class="col-span-1 bg-white rounded-xl shadow-md w-full p-4 flex flex-col"
  >
    <h2 class="text-lg font-semibold mb-4 text-gray-800">
      {{ column.name }}
    </h2>

    <draggableComponent
      class="h-full flex flex-col gap-2"
      item-key="id"
      group="tasks"
      :list="column.tasks"
      :tag="'div'"
      :data-column-id="column.id"
      @add="emit('task-add', $event)"
      @remove="emit('task-remove', $event)"
    >
      <template #item="{ element }">
        <BoardTaskCard :task="element" />
      </template>

      <template>
        <div v-if="!column.tasks.length" class="text-sm text-gray-400 italic">
          No tasks
        </div>
      </template>
    </draggableComponent>
  </div>
</template>
