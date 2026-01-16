<script setup lang="ts">
import { useBetSlipStore } from "@/stores/betSlip.store";
import {
  AnFilledInfoCircle,
  BsCurrencyEuro,
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
    betSlip.stake
  )
);
const formattedReturn = computed(() =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "EUR" }).format(
    betSlip.potentialReturn || 0
  )
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
  <!-- sticky abaixo do header de 60px -->
  <aside class="flex flex-col items-center sticky top-15 w-full">
    <div
      class="w-full h-11/12 bg-content-bg rounded-xl border border-white/5 p-3 flex flex-col gap-2"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-1">
        <p class="flex items-center gap-2 text-white font-semibold text-sm">
          <span
            class="bg-sky-500 rounded-full flex items-center justify-center w-6 h-6 text-xs"
          >
            {{ betSlip.selections.length }}
          </span>
          Bet Slip
        </p>
      </div>

      <!-- Single / Multiple -->
      <div class="flex gap-1">
        <Button
          variant="secondary"
          class="flex-1 text-sm font-semibold py-1.5"
          :class="
            betSlip.betType === 'single'
              ? 'bg-sky-500 text-white'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          "
          @click="setBetType('single')"
        >
          Single
        </Button>
        <Button
          variant="secondary"
          class="flex-1 text-sm font-semibold py-1.5"
          :class="
            betSlip.betType === 'multiple'
              ? 'bg-sky-500 text-white'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          "
          @click="setBetType('multiple')"
        >
          Multiple
        </Button>
      </div>

      <!-- Multiples Trixie Patent Double -->
      <div class="flex gap-1 text-xs pb-1">
        <Button
          variant="secondary"
          class="flex-1 py-1 bg-emerald-900/70 text-emerald-300 font-semibold text-[12px]"
        >
          Multiples
        </Button>
        <Button
          variant="secondary"
          class="flex-1 py-1 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 text-[12px]"
        >
          Trixie
        </Button>
        <Button
          variant="secondary"
          class="flex-1 py-1 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 text-[12px]"
        >
          Patent
        </Button>
        <Button
          variant="secondary"
          class="flex-1 py-1 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 text-[12px]"
        >
          Double
        </Button>
      </div>

      <!-- Bet cards: área que rola -->
      <div class="flex-1 overflow-auto space-y-1 pr-1">
        <BetCard
          v-for="selection in betSlip.selections"
          :key="selection.horseId"
          @remove="removeBet(selection.horseId)"
          :race-id="selection.raceId"
          :race-name="selection.raceName"
          :horse-id="selection.horseId"
          :horse-name="selection.horseName"
          :shirt-color="selection.shirtColor"
          :bet="selection.bet"
          :odd-type="selection.oddType"
          :odds="selection.odds"
        />
      </div>

      <!-- Footer -->
      <div class="space-y-1 pt-1">
        <!-- EW -->
        <div class="flex items-center gap-1 text-xs text-white px-1">
          <Checkbox id="ew" />
          <CaArrowsHorizontal class="text-sm" />
          <label for="ew">EW</label>
        </div>

        <!-- Valores fixos -->
        <div class="flex gap-1 text-xs justify-between px-1">
          <Button
            v-for="val in [10, 5, 25, 100]"
            :key="val"
            variant="secondary"
            class="flex-1 flex items-center justify-center gap-1 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 text-[14px] py-1.5"
            @click="addValue(val)"
          >
            <BsCurrencyEuro />
            {{ val }}
          </Button>
        </div>

        <!-- Resumo -->
        <div class="text-sm text-white space-y-0.5 px-1">
          <div class="flex justify-between">
            <span>Total odds</span>
            <span class="font-semibold">{{
              betSlip.totalOdds.toFixed(2)
            }}</span>
          </div>
          <div class="flex justify-between">
            <span>Stake</span>
            <span class="font-semibold">{{ formattedStake }}</span>
          </div>
          <div class="flex justify-between">
            <span>To return</span>
            <span class="font-semibold">{{ formattedReturn }}</span>
          </div>
        </div>

        <!-- Info + Place bet -->
        <div class="space-y-1 px-1">
          <div
            class="rounded-lg bg-zinc-800 text-sm text-zinc-200 flex items-center gap-2 px-1.5 py-1 justify-center"
          >
            <AnFilledInfoCircle class="text-sm" />
            <p class="truncate">Some selections not combinable</p>
          </div>

          <div class="flex gap-1 h-9">
            <Button
              variant="secondary"
              class="w-9 bg-zinc-800 text-white hover:bg-zinc-700"
              @click="clearSlip"
            >
              <FaTrash class="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              class="flex-1 bg-sky-500 text-white font-semibold text-[16px] hover:bg-sky-400 disabled:bg-zinc-700"
              :disabled="!betSlip.canPlaceBet"
            >
              Place bet
            </Button>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
