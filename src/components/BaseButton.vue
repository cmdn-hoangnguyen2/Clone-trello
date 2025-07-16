<script setup lang="ts">
defineProps<{
  type: "button" | "submit";
  class?: string;
}>();

const emit = defineEmits(["on-click"]);
</script>

<template>
  <button
    class="flex justify-between items-center rounded-md px-3 py-2 cursor-pointer"
    :class="class"
    :type="type"
    @click="emit('on-click')"
  >
    <slot />
  </button>
</template>
