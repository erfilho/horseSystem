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
    class="flex flex-row border-t border-zinc-700 h-16 w-full px-2 py-2 text-white items-center"
  >
    <!-- Delete bet button -->
    <button
      class="flex justify-center items-center w-8 h-8 hover:bg-zinc-800 rounded-full"
      @click="emit('remove', horseId)"
    >
      <HuTimesCircle class="w-5 h-5" />
    </button>

    <!-- Bet description -->
    <div class="flex flex-col gap-1 font-bold w-full ml-1">
      <div class="flex gap-1 items-center">
        <span :class="[`text-2xl ${shirtColor}`]"><BxSolidTShirt /></span>
        <span class="truncate">{{ horseName }}</span>
      </div>

      <span class="text-sm font-medium text-zinc-400">
        {{ bet }} / {{ raceName }}
      </span>
    </div>

    <!-- Bet odds -->
    <div class="flex flex-row items-start h-full justify-start gap-2">
      <p class="font-bold">{{ formatOdds(odds) }}</p>
      <span
        class="bg-yellow-800 text-yellow-200 font-semibold text-sm px-1 py-0.5 rounded-lg"
      >
        {{ oddType }}
      </span>
    </div>
  </div>
</template>
