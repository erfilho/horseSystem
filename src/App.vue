<script setup lang="ts">
import type { RouterView } from "vue-router";
import Header from "./components/Header.vue";
</script>

<template>
  <div
    class="h-screen w-full overflow-hidden bg-df-bg grid grid-cols-3 grid-rows-[60px_1fr] gap-0"
  >
    <Header />
    <RouterView />
  </div>
</template>
