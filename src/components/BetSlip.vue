<script setup lang="ts">
import {
  AnFilledInfoCircle,
  BsCurrencyEuro,
  CaArrowsHorizontal,
  FaTrash,
} from "@kalimahapps/vue-icons";

import BetCard from "./BetCard.vue";
import Button from "./ui/button/Button.vue";
import Checkbox from "./ui/checkbox/Checkbox.vue";

import { useBetSlipStore } from "@/stores/betSlip.store";
import { computed } from "vue";

const betSlip = useBetSlipStore();

const formattedStake = computed(() =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "EUR",
  }).format(betSlip.stake)
);

const formattedReturn = computed(() =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "EUR",
  }).format(betSlip.potentialReturn || 0)
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
  <div class="p-2 flex flex-col gap-1 justify-start items-center rounded-xl">
    <div class="w-full h-full bg-content-bg rounded-xl p-2 flex flex-col gap-2">
      <!-- Title -->
      <div class="w-full flex flex-col px-1">
        <p class="flex gap-2 text-white font-bold text-lg">
          <span
            class="bg-primary-button rounded-full flex items-center justify-center w-6"
          >
            {{ betSlip.selections.length }} </span
          >Bet Slip
        </p>
      </div>

      <!-- Bets types buttons -->
      <div class="gap-2 flex py-1">
        <Button
          variant="secondary"
          class="hover:cursor-pointer text-white"
          :class="
            betSlip.betType === 'single'
              ? 'bg-action-button hover:bg-sky-400'
              : 'bg-secondary-button hover:bg-zinc-600'
          "
          @click="setBetType('single')"
        >
          Single
        </Button>
        <Button
          variant="secondary"
          class="hover:cursor-pointer text-white"
          :class="
            betSlip.betType === 'multiple'
              ? 'bg-action-button hover:bg-sky-400'
              : 'bg-secondary-button hover:bg-zinc-600'
          "
          @click="setBetType('multiple')"
        >
          Multiple
        </Button>
      </div>

      <!-- Bets types buttons -->
      <div class="gap-2 flex justify-between py-1">
        <Button
          variant="secondary"
          class="bg-filter-button text-teal-400 hover:bg-teal-800 hover:cursor-pointer font-bold"
        >
          Multiples
        </Button>
        <Button
          variant="secondary"
          class="bg-secondary-button hover:bg-zinc-600 hover:cursor-pointer text-white"
        >
          Trixie
        </Button>
        <Button
          variant="secondary"
          class="bg-secondary-button hover:bg-zinc-600 hover:cursor-pointer text-white"
        >
          Patent
        </Button>
        <Button
          variant="secondary"
          class="bg-secondary-button hover:bg-zinc-600 hover:cursor-pointer text-white"
        >
          Double
        </Button>
      </div>

      <!-- Bet details -->
      <div class="w-full py-1 h-7/12">
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

      <!-- Bet cart -->
      <div class="w-full flex flex-col gap-2">
        <div class="flex gap-1 font-bold text-white items-center px-2">
          <Checkbox id="ew" /> <CaArrowsHorizontal />
          <label for="ew"> EW </label>
        </div>

        <!-- Ammount buttons -->
        <div
          class="flex items-center gap-2 h-10 text-white justify-between px-2"
        >
          <Button
            variant="secondary"
            class="bg-active-link hover:cursor-pointer active:bg-primary-button"
            @click="addValue(10)"
          >
            <BsCurrencyEuro /> 10.00
          </Button>
          <Button
            variant="secondary"
            class="bg-secondary-button hover:cursor-pointer active:bg-primary-button"
            @click="addValue(5)"
          >
            <BsCurrencyEuro /> 5
          </Button>
          <Button
            variant="secondary"
            class="bg-secondary-button hover:cursor-pointer active:bg-primary-button"
            @click="addValue(25)"
          >
            <BsCurrencyEuro /> 25
          </Button>
          <Button
            variant="secondary"
            class="bg-secondary-button hover:cursor-pointer active:bg-primary-button"
            @click="addValue(100)"
          >
            <BsCurrencyEuro /> 100
          </Button>
        </div>

        <!-- Values details -->
        <div class="flex text-white flex-col items-center px-2 gap-1">
          <span class="flex justify-between items-center w-full">
            <p>Total odds</p>
            <p class="font-bold">
              {{ betSlip.totalOdds.toFixed(2) }}
            </p>
          </span>
          <span class="flex justify-between items-center w-full">
            <p>Total Stake</p>
            <p class="font-bold">{{ formattedStake }}</p>
          </span>
          <span class="flex justify-between items-center w-full">
            <p>To return</p>
            <p class="font-bold">{{ formattedReturn }}</p>
          </span>
        </div>

        <!-- Bets completion -->
        <div
          class="flex text-white flex-col items-center p-2 justify-center h-full gap-2"
        >
          <!-- Info span -->
          <span
            class="rounded-xl bg-secondary-button h-8 flex items-center gap-2 px-2"
          >
            <AnFilledInfoCircle />
            <p class="text-sm">Some of your selection are not combinable</p>
          </span>

          <!-- Login and trash buttons -->
          <span class="gap-2 flex h-12 items-center w-full justify-center">
            <Button
              variant="secondary"
              class="bg-secondary-button text-white w-10 hover:cursor-pointer hover:bg-primary-button"
              @click="clearSlip"
            >
              <FaTrash />
            </Button>
            <Button
              variant="secondary"
              class="bg-zinc-700 w-10/12 font-bold text-medium hover:cursor-pointer hover:bg-zinc-600"
              :disabled="!betSlip.canPlaceBet"
            >
              Place bet
            </Button></span
          >
        </div>
      </div>
    </div>
  </div>
</template>
