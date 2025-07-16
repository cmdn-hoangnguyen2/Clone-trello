<script setup lang="ts">
import { ref } from "vue";
import BaseCard from "./BaseCard.vue";

defineProps<{}>();
const emit = defineEmits(["submitNewTask"]);

const title = ref("");

const handleSubmit = () => {
  if (!title.value.trim()) return;

  emit("submitNewTask", title.value.trim());
  title.value = "";
};
</script>

<template>
  <BaseCard>
    <div class="flex justify-between items-center">
      <input v-model="title" type="text" placeholder="Enter task title" />

      <button type="submit" @click="handleSubmit">
        <i class="pi pi-check"></i>
      </button>
    </div>
  </BaseCard>
</template>
