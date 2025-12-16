<script setup lang="ts">
import {
  AnFilledPlaySquare,
  CaArrowsHorizontal,
  FaHorseHead,
  FlFilledHome,
  HiSolidGiftTop,
  LuBlocks,
} from "@kalimahapps/vue-icons";
import type { Component } from "vue";
import BetCard from "./BetCard.vue";
import Button from "./ui/button/Button.vue";
import Checkbox from "./ui/checkbox/Checkbox.vue";

interface NavLink {
  title: string;
  icon: Component;
  url: string;
  isActive: boolean;
}

const linksPrimary: NavLink[] = [
  {
    title: "Home",
    icon: FlFilledHome,
    url: "/home",
    isActive: true,
  },
  {
    title: "Rewards",
    icon: HiSolidGiftTop,
    url: "/rewards",
    isActive: false,
  },
  {
    title: "In-Play",
    icon: AnFilledPlaySquare,
    url: "/in-play",
    isActive: false,
  },
  {
    title: "Acca Builder",
    icon: LuBlocks,
    url: "/acca-builder",
    isActive: false,
  },
];

const sports: NavLink[] = [
  {
    title: "Horse Racing",
    icon: FaHorseHead,
    url: "/horses",
    isActive: false,
  },
];
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
      <div class="w-full py-1">
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
        <div class="flex gap-1 font-bold text-white items-center">
          <Checkbox id="ew" /> <CaArrowsHorizontal />
          <label for="ew"> EW </label>
        </div>
        <!-- Ammount buttons -->
        <div class="flex items-center gap-2 h-10 text-white justify-center">
          <Button
            variant="secondary"
            class="bg-active-link hover:cursor-pointer"
          >
            E 10.00
          </Button>
          <Button
            variant="secondary"
            class="bg-secondary-button hover:cursor-pointer"
          >
            E 5
          </Button>
          <Button
            variant="secondary"
            class="bg-secondary-button hover:cursor-pointer"
          >
            E 25
          </Button>
          <Button
            variant="secondary"
            class="bg-secondary-button hover:cursor-pointer"
          >
            E 100
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
