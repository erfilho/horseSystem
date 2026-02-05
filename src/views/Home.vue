<!-- Home.vue (layout principal atualizado) -->
<script setup>
import Sidebar from "@/components/Sidebar.vue";
import BetSlip from "../components/BetSlip.vue";
import MainContent from "../components/MainContent.vue";
</script>

<template>
  <div
    class="min-h-screen w-full text-white grid grid-cols-[240px_1fr_340px] gap-4 bg-bg-main"
  >
    <aside class="h-full overflow-y-auto">
      <Sidebar />
    </aside>

    <main class="h-full overflow-y-auto">
      <MainContent />
    </main>

    <aside class="h-full">
      <BetSlip />
    </aside>
  </div>
</template>
