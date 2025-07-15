<script setup lang="ts">
import type { Task } from "../types/task";

defineProps<{
  task: Task;
}>();
</script>

<template>
  <div
    class="bg-gray-50 p-3 rounded-lg shadow-sm text-sm text-gray-700"
    :key="task.id"
  >
    {{ task.title }}
  </div>
</template>
