<script setup>
import BetSlip from "../components/BetSlip.vue";
import MainContent from "../components/MainContent.vue";
import Sidebar from "../components/Sidebar.vue";
</script>

<template>
  <div
    class="py-2 h-full w-full overflow-hidden grid grid-cols-[240px_1fr_320px] grid-rows-1 col-span-3 gap-2 px-20"
  >
    <Sidebar />
    <MainContent />
    <BetSlip />
  </div>
</template>
