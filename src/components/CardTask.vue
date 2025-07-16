<script setup lang="ts">
import type { Task } from "../types/task";
import BaseCard from "./BaseCard.vue";

const props = defineProps<{
  task: Task;
}>();
const emit = defineEmits(["view-detail"]);

const handleViewDetail = () => {
  emit("view-detail", props.task);
};
</script>

<template>
  <BaseCard @click="handleViewDetail">
    <p class="font-semibold text-gray-800">
      {{ task.title }}
    </p>
  </BaseCard>
</template>
