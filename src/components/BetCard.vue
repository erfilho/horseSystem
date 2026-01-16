<script setup lang="ts">
import formatOdds from "@/utils/formatOdds";
import { BxSolidTShirt, HuTimesCircle } from "@kalimahapps/vue-icons";

defineProps<{
  raceId: string;
  horseId: string;
  horseName: string;
  raceName: string;
  shirtColor: string;
  bet: string;
  oddType: string;
  odds: number;
}>();

const emit = defineEmits<{
  (e: "remove", horseId: string): void;
}>();
</script>

<template>
  <div
    class="flex flex-row bg-content-bg border-t border-zinc-700
           h-14 w-full px-2 py-1 text-white items-center"
  >
    <button
      class="flex justify-center items-center w-8 h-8 hover:bg-zinc-800 rounded"
      @click="emit('remove', horseId)"
    >
      <HuTimesCircle class="w-4 h-4" />
    </button>

    <div class="flex flex-col gap-1 font-bold w-full ml-1">
      <div class="flex gap-1 items-center text-xs">
        <span :class="[`text-lg ${shirtColor}`]"><BxSolidTShirt /></span>
        <span class="truncate">{{ horseName }}</span>
      </div>
      <span class="text-[10px] font-medium text-zinc-400">
        {{ bet }} / {{ raceName }}
      </span>
    </div>

    <div class="flex flex-col items-end gap-0.5 ml-auto">
      <p class="text-xs font-bold">{{ formatOdds(odds) }}</p>
      <span
        class="bg-yellow-800 text-yellow-200 text-[9px] px-1 py-0.5 rounded"
      >
        {{ oddType }}
      </span>
    </div>
  </div>
</template>
