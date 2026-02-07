<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useBetSlipStore } from "@/stores/betSlip.store";
import formatOdds from "@/utils/formatOdds";
import { BxSolidTShirt } from "@kalimahapps/vue-icons";
import { computed } from "vue";

const props = defineProps<{
  shirtNumber: number;
  horse: string;
  jockey: string;
  trainer: string;
  shirtColor: string;
  odds: number;
  horseAge: number;
  formCode: string;
  lastOdds: string;
}>();

const betSlip = useBetSlipStore();

const isSelected = computed(() =>
  betSlip.selections.some((s) => s.horseId === props.horse),
);

const emit = defineEmits<{
  (e: "select", payload: any): void;
}>();
</script>

<template>
  <div class="flex flex-col justify-start gap-2 py-4">
    <!-- Main content -->
    <div class="flex items-center gap-4 justify-between w-full">
      <div class="flex flex-row items-center gap-3">
        <div
          class="w-16 h-16 rounded flex items-center justify-center font-bold"
        >
          <p :class="[`text-5xl`, shirtColor]"><BxSolidTShirt /></p>
        </div>

        <div>
          <p class="font-medium text-lg">{{ shirtNumber }}. {{ horse }}</p>
          <p class="text-white/60">J: {{ jockey }} | T: {{ trainer }}</p>
        </div>
      </div>

      <Button
        variant="outline"
        size="lg"
        class="h-14 w-24 bg-white text-black text-lg font-semibold rounded-xl"
        :disabled="isSelected"
        @click="emit('select', horse)"
      >
        {{ formatOdds(odds) }}
      </Button>
    </div>

    <!-- Footer infos. -->
    <div class="flex items-center flex-row justify-between gap-2">
      <div class="flex flex-row items-center justify-start gap-2">
        <span
          class="rounded-xl bg-primary-button px-2 py-1 text-sm font-medium"
        >
          Form: {{ formCode }}
        </span>

        <span
          class="rounded-xl bg-primary-button px-2 py-1 text-sm font-medium"
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
