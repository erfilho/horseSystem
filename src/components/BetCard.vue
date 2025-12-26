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
    class="flex flex-row bg-content-bg border-t border-zinc-700 h-16 w-full px-1 py-2 text-white"
  >
    <span class="flex justify-start h-full p-1 text-xl">
      <HuTimesCircle
        class="hover:cursor-pointer"
        @click="emit('remove', horseId)"
      />
    </span>

    <div class="flex flex-col gap-2 font-bold w-full">
      <div class="flex gap-2 items-center">
        <p :class="[`text-2xl`, shirtColor]"><BxSolidTShirt /></p>
        <p>{{ horseName }}</p>
      </div>
      <span class="font-medium"> {{ bet }} / {{ raceName }}</span>
    </div>

    <div class="font-bold flex gap-2">
      <p>{{ formatOdds(odds) }}</p>
      <span class="bg-yellow-800 text-yellow-200 h-fit rounded-lg px-1">
        {{ oddType }}</span
      >
    </div>
  </div>
</template>
