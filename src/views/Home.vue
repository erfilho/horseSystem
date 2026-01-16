<script setup>
import BetSlip from "../components/BetSlip.vue";
import MainContent from "../components/MainContent.vue";
import Sidebar from "../components/Sidebar.vue";
</script>

<template>
  <div
    class="min-h-screen w-full bg-[#050b18] text-white grid grid-cols-[220px_minmax(0,1fr)_300px] gap-4 px-10 py-4 col-span-3"
  >
    <Sidebar />
    <MainContent />
    <BetSlip />
  </div>
</template>
