<!-- Home.vue (layout principal atualizado) -->
<script setup>
import BetSlip from "../components/BetSlip.vue";
import MainContent from "../components/MainContent.vue";
import Sidebar from "../components/Sidebar.vue";
</script>

<template>
  <div
    class="min-h-screen w-full text-white grid grid-cols-[220px_1fr_340px] lg:grid-cols-[220px_minmax(0,1fr)_320px] gap-4 px-4 py-6 col-span-3 bg-linear-to-br from-gray-900 via-black to-blue-900/20"
  >
    <Sidebar />
    <MainContent />
    <BetSlip />
  </div>
</template>
