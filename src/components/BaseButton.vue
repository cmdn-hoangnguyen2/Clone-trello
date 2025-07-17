<script setup lang="ts">
import { computed } from "vue";
import { BUTTON_VARIANT } from "../constants/button";
import type { COLOR } from "../constants/color";
import { mapColorToClass } from "../utils/mapColorToClass";

const props = withDefaults(
  defineProps<{
    label: string;
    variant: BUTTON_VARIANT;
    color: COLOR;
    icon?: string;
    type?: "button" | "submit";
    class?: string;
    isDisable?: boolean;
  }>(),
  {
    type: "button",
    class: "",
    isDisable: false,
  }
);

const emit = defineEmits(["on-click"]);

const classes = computed(
  () => `${mapColorToClass(props.color)} ${props.class}`
);
</script>

<template>
  <button
    class="button flex justify-between items-center rounded-md px-3 py-2 cursor-pointer"
    :class="classes"
    :type="type"
    @click="emit('on-click')"
    :disabled="isDisable"
  >
    <span>
      {{ label }}
    </span>

    <i
      class="pi"
      :class="`pi-${icon}`"
      v-if="icon && variant === BUTTON_VARIANT.BUTTON_ICON"
    ></i>
  </button>
</template>
