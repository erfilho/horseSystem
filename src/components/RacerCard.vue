<script setup lang="ts">
import { BxSolidTShirt } from "@kalimahapps/vue-icons";

defineProps<{
  shirtNumber: number;
  horse: string;
  jockey: string;
  trainer: string;
  shirtColor: string;
  odds: string;
  horseAge: number;
  formCode: string;
  lastOdds: string;
}>();
</script>

<template>
  <div class="flex flex-col justify-start iitems-center gap-2 py-4">
    <div class="flex items-center gap-4 justify-between w-full">
      <div class="flex flex-row items-center gap-3">
        <div
          class="w-8 h-8 rounded flex items-center justify-center text-sm font-bold"
        >
          <p :class="[`text-4xl`, shirtColor]"><BxSolidTShirt /></p>
        </div>

        <div>
          <p class="font-medium">{{ shirtNumber }}. {{ horse }}</p>
          <p class="text-xs text-zinc-400">
            J: {{ jockey }} | T: {{ trainer }}
          </p>
        </div>
      </div>

      <button
        class="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-green-600 transition text-sm font-semibold"
      >
        {{ odds }}
      </button>
    </div>

    <div class="flex items-center flex-row justify-between gap-2">
      <div class="flex flex-row items-center justify-start gap-2">
        <span
          class="rounded-xl bg-primary-button px-2 flex items-center text-sm"
        >
          Form: {{ formCode }}
        </span>
        <span
          class="rounded-xl bg-primary-button px-2 flex items-center text-sm"
        >
          Age: {{ horseAge }}</span
        >
      </div>
      <div class="flex flex-row gap-2 px-2">
        <span class="text-sm"> {{ lastOdds }} </span>
      </div>
    </div>
  </div>
</template>
