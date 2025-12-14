<script setup lang="ts">
import Button from "./ui/button/Button.vue";

import type { Component } from "vue";

defineProps<{
  title: string;
  icon: Component;
  url: string;
  isActive: boolean;
}>();
</script>

<template>
  <Button
    variant="secondary"
    class="flex items-center justify-start gap-2 w-42 hover:bg-zinc-800 rounded-lg"
    :class="isActive ? 'bg-zinc-800 text-white' : 'bg-zinc-900'"
  >
    <component
      :is="icon"
      class="w-4 h-4"
      :class="isActive ? 'text-white' : 'text-zinc-400'"
    />
    <span class="text-white font-bold">{{ title }}</span>
  </Button>
</template>
