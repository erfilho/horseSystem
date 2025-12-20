<script setup>
import BetSlip from "../components/BetSlip.vue";
import MainContent from "../components/MainContent.vue";
import Sidebar from "../components/Sidebar.vue";
</script>

<template>
  <div class="px-10 py-2 flex grow h-full overflow-hidden">
    <Sidebar />
    <MainContent />
    <BetSlip />
  </div>
</template>
