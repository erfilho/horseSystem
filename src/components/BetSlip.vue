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

import { useValueStore } from "@/stores/useValueStore";
import { computed } from "vue";

const store = useValueStore();

const formattedAmount = computed(() =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "EUR",
  }).format(store.ammountBase)
);

function addValue(value: number) {
  store.addAmmount(value);
  console.log(store.ammountBase);
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
            3 </span
          >Bet Slip
        </p>
      </div>

      <!-- Bets types buttons -->
      <div class="gap-2 flex py-1">
        <Button
          variant="secondary"
          class="bg-secondary-button hover:bg-zinc-600 hover:cursor-pointer text-white"
        >
          Single
        </Button>
        <Button
          variant="secondary"
          class="bg-action-button hover:bg-sky-400 hover:cursor-pointer text-white"
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
          :runner="'Jason Ginyu'"
          :odd="'7/3'"
          :bet="'Race winner'"
          :race="'17:05 / Vincennes'"
          :odd-type="'SP'"
          :shirt-color="'text-yellow-400'"
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
            <p class="font-bold">N/A</p>
          </span>
          <span class="flex justify-between items-center w-full">
            <p>Total Stake</p>
            <p class="font-bold">{{ formattedAmount }}</p>
          </span>
          <span class="flex justify-between items-center w-full">
            <p>To return</p>
            <p class="font-bold">N/A</p>
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
            >
              <FaTrash />
            </Button>
            <Button
              variant="secondary"
              class="bg-zinc-700 w-10/12 font-bold text-medium hover:cursor-pointer hover:bg-zinc-600"
            >
              Log in to place bet
            </Button></span
          >
        </div>
      </div>
    </div>
  </div>
</template>
