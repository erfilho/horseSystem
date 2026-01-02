<script setup lang="ts">
defineProps<{ show: boolean }>();
const emit = defineEmits(["close"]);
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
      @click.self="emit('close')"
    >
      <div class="bg-df-bg rounded-xl p-6 min-w-100">
        <slot />
      </div>
    </div>
  </Teleport>
</template>
