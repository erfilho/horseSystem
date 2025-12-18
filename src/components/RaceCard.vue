<script setup lang="ts">
defineProps<{
  time: string;
  local: string;
  isLiveNow: boolean;
}>();
</script>

<template>
  <button
    class="min-w-20 px-4 py-3 rounded-lg hover:bg-primary-button hover:cursor-pointer text-center"
    :class="isLiveNow ? 'bg-secondary-button' : 'bg-none'"
  >
    <div class="text-sm font-medium">{{ time }}</div>
    <div class="text-xs text-zinc-400">{{ local }}</div>
  </button>
</template>
