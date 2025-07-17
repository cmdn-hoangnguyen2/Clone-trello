<script setup lang="ts">
import { Teleport } from "vue";

defineProps<{
  isShadowBackground: boolean;
  isOpen: boolean;
}>();
const emit = defineEmits(["close-modal"]);

const handleCloseModal = () => {
  emit("close-modal");
};
</script>

<template>
  <Teleport to="body">
    <div
      class="modal absolute inset-0 w-screen h-screen flex justify-center items-center"
      v-if="isOpen"
    >
      <div
        class="modal-shadow-bg absolute inset-0 bg-black opacity-10"
        v-show="isShadowBackground"
        @click="handleCloseModal"
      ></div>

      <div
        class="w-full max-w-xl bg-gray-50 p-3 rounded-lg text-sm text-gray-700 border-2 z-50"
      >
        <slot />
      </div>
    </div>
  </Teleport>
</template>
