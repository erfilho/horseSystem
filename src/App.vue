<script setup lang="ts">
import type { RouterView } from "vue-router";
import Header from "./components/Header.vue";
</script>

<template>
  <div class="h-screen w-full bg-bg-main overflow-hidden">
    <header class="h-15 w-full flex items-center">
      <Header />
    </header>

    <div class="relative h-[calc(100vh-60px)]">
      <RouterView />
    </div>
  </div>
</template>
