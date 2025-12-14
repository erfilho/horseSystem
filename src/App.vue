<script setup>
import BetSlip from "./components/BetSlip.vue";
import Header from "./components/Header.vue";
import MainContent from "./components/MainContent.vue";
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <div class="flex h-[100vh] w-full flex-col justify-between gap-0.5">
    <Header />
    <div class="px-10 h-full py-2 flex flex-row items-center justify-center">
      <Sidebar />
      <MainContent />
      <BetSlip />
    </div>
  </div>
</template>
