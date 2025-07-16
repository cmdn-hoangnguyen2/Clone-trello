<script setup lang="ts">
import BaseButton from "./BaseButton.vue";

const props = withDefaults(
  defineProps<{
    label: string;
    icon: string;
    type?: "button" | "submit";
    class?: string;
  }>(),
  {
    type: "button",
    class: "",
  }
);

const emit = defineEmits(["on-click"]);
</script>

<template>
  <BaseButton :type="props.type" :class="class" @on-click="emit('on-click')">
    <span>
      {{ label }}
    </span>

    <i class="pi" :class="`pi-${props.icon}`"></i>
  </BaseButton>
</template>
