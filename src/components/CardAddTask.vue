<script setup lang="ts">
import { ref } from "vue";
import BaseCard from "./BaseCard.vue";

defineProps<{}>();
const emit = defineEmits(["submit-add-task"]);

const title = ref("");

const handleSubmit = () => {
  if (!title.value.trim()) return;

  emit("submit-add-task", title.value.trim());
  title.value = "";
};
</script>

<template>
  <BaseCard>
    <div class="flex justify-between items-center">
      <input
        class="input-add-new-task"
        v-model="title"
        type="text"
        placeholder="Enter task title"
      />

      <button
        class="button button-add-new-task"
        type="submit"
        @click="handleSubmit"
      >
        <i class="pi pi-check"></i>
      </button>
    </div>
  </BaseCard>
</template>
