<script setup lang="ts">
import {
  AnFilledPlaySquare,
  FaHorseHead,
  FlFilledHome,
  HiSolidGiftTop,
  LuBlocks,
} from "@kalimahapps/vue-icons";
import type { Component } from "vue";
import Button from "./ui/button/Button.vue";

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
  <div
    class="w-1/6 p-2 flex flex-col gap-1 justify-start items-center rounded-xl"
  >
    <div class="w-full h-full bg-content-bg rounded-xl p-2">
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
      <div class="bg-slate-50">
        <Button> Single </Button>
        <Button> Multiple </Button>
      </div>
    </div>
  </div>
</template>
