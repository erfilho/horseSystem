<!-- BetSlip.vue (mantido com correções menores para consistência) -->
<script setup lang="ts">
import { useBetSlipStore } from "@/stores/betSlip.store";
import {
  AnFilledInfoCircle,
  CaArrowsHorizontal,
  FaTrash,
} from "@kalimahapps/vue-icons";
import { computed } from "vue";
import BetCard from "./BetCard.vue";
import Button from "./ui/button/Button.vue";
import Checkbox from "./ui/checkbox/Checkbox.vue";

const betSlip = useBetSlipStore();

const formattedStake = computed(() =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "EUR" }).format(
    betSlip.stake,
  ),
);
const formattedReturn = computed(() =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "EUR" }).format(
    betSlip.potentialReturn || 0,
  ),
);

function addValue(value: number) {
  betSlip.stake += value;
}
function clearSlip() {
  betSlip.clear();
}
function removeBet(horse: string) {
  betSlip.removeSelection(horse);
}
function setBetType(type: "single" | "multiple") {
  betSlip.setBetType(type);
}
</script>

<template>
  <aside class="flex flex-col sticky top-24 w-full h-[calc(100vh-6rem)]">
    <div
      class="w-full h-full bg-content-bg rounded-xl border border-white/5 flex flex-col p-4 gap-3 overflow-hidden"
    >
      <!-- Header -->
      <div class="flex items-center justify-between">
        <p class="flex items-center gap-2 text-white font-semibold text-sm">
          <span
            class="bg-sky-500 rounded-full flex items-center justify-center w-7 h-7 text-xs font-bold"
            >{{ betSlip.selections.length }}</span
          >
          Bet Slip
        </p>
      </div>

      <!-- Bet Type Toggle -->
      <div class="flex gap-1">
        <Button
          variant="secondary"
          class="flex-1 text-xs font-semibold py-2 rounded-lg"
          :class="
            betSlip.betType === 'single'
              ? 'bg-sky-500 text-white'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          "
          @click="setBetType('single')"
          >Single</Button
        >
        <Button
          variant="secondary"
          class="flex-1 text-xs font-semibold py-2 rounded-lg"
          :class="
            betSlip.betType === 'multiple'
              ? 'bg-sky-500 text-white'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          "
          @click="setBetType('multiple')"
          >Multiple</Button
        >
      </div>

      <!-- Multiples Options -->
      <div class="flex gap-1 text-xs pb-2">
        <Button
          variant="secondary"
          class="flex-1 py-1.5 bg-emerald-900/50 text-emerald-200 rounded-lg font-semibold"
          >Multiples</Button
        >
        <Button
          variant="secondary"
          class="flex-[2] py-1.5 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 rounded-lg text-[11px]"
          >Trixie</Button
        >
        <!-- Patent, Double similares -->
      </div>

      <!-- Selections Scrollable -->
      <div class="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        <BetCard
          v-for="selection in betSlip.selections"
          :key="selection.horseId"
          @remove="removeBet(selection.horseId)"
          v-bind="selection"
        />
      </div>

      <!-- Footer -->
      <div class="space-y-2 pt-2 border-t border-white/5">
        <div class="flex items-center gap-2 text-xs text-zinc-300 px-1">
          <Checkbox id="ew" />
          <CaArrowsHorizontal class="text-sm" />
          <label for="ew" class="cursor-pointer">EW</label>
        </div>

        <div class="flex gap-1 text-xs px-1">
          <Button
            v-for="val in [2, 5, 10, 25]"
            :key="val"
            variant="secondary"
            class="flex-1 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 text-sm py-1.5 rounded-lg font-mono"
            @click="addValue(val)"
          >
            €{{ val }}
          </Button>
        </div>

        <div class="text-sm space-y-1 px-1">
          <div class="flex justify-between">
            <span>Total odds</span
            ><span class="font-bold">{{ betSlip.totalOdds.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Stake</span
            ><span class="font-bold">{{ formattedStake }}</span>
          </div>
          <div class="flex justify-between">
            <span>Retorno</span
            ><span class="font-bold text-emerald-400">{{
              formattedReturn
            }}</span>
          </div>
        </div>

        <div class="space-y-2 px-1">
          <div
            class="bg-zinc-800/50 text-xs text-zinc-300 flex items-center gap-2 px-2 py-1.5 rounded-lg backdrop-blur-sm"
          >
            <AnFilledInfoCircle class="text-sm" /> Algumas seleções não
            combináveis
          </div>
          <div class="flex gap-2">
            <Button
              variant="secondary"
              class="flex-1 bg-zinc-800 hover:bg-zinc-700 h-10 rounded-lg"
              @click="clearSlip"
            >
              <FaTrash class="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              class="flex-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold text-sm h-10 rounded-lg hover:from-sky-600 disabled:from-zinc-700 disabled:to-zinc-600"
              :disabled="!betSlip.canPlaceBet"
              >Place Bet</Button
            >
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
