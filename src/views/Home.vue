<!-- Home.vue (layout principal atualizado) -->
<script setup>
import NewSide from "@/components/sidebar/NewSide.vue";
import SidebarInset from "@/components/ui/sidebar/SidebarInset.vue";
import SidebarProvider from "@/components/ui/sidebar/SidebarProvider.vue";
import BetSlip from "../components/BetSlip.vue";
import MainContent from "../components/MainContent.vue";
</script>

<template>
  <div
    class="min-h-screen w-full text-white grid grid-cols-[220px_1fr_340px] lg:grid-cols-[220px_minmax(0,1fr)_320px] gap-4 px-4 py-6 col-span-3 bg-linear-to-br from-gray-900 via-black to-blue-900/20"
  >
    <SidebarProvider class="flex flex-col">
      <div class="flex flex-1">
        <NewSide />
        <SidebarInset>
          <div class="flex flex-1 flex-col gap-4 p-4">
            <div class="grid auto-rows-min gap-4 md:grid-cols-3">
              <div class="bg-muted/50 aspect-video rounded-xl" />
              <div class="bg-muted/50 aspect-video rounded-xl" />
              <div class="bg-muted/50 aspect-video rounded-xl" />
            </div>
            <div
              class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"
            />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
    <MainContent />
    <BetSlip />
  </div>
</template>
