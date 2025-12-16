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
    class="flex items-center justify-start gap-2 w-42 hover:bg-active-link hover:cursor-pointer rounded-lg"
    :class="
      isActive
        ? 'bg-active-link hover:bg-zinc-700 hover:cursor-pointer text-white'
        : 'bg-df-bg'
    "
  >
    <component
      :is="icon"
      class="w-4 h-4"
      :class="isActive ? 'text-white' : 'text-zinc-400'"
    />
    <span class="text-white font-bold">{{ title }}</span>
  </Button>
</template>
