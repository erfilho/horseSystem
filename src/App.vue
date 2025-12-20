<script setup lang="ts">
import type { RouterView } from "vue-router";
import Header from "./components/Header.vue";
</script>

<template>
  <div class="flex h-screen w-full flex-col overflow-hidden bg-df-bg">
    <Header />
    <RouterView />
  </div>
</template>
