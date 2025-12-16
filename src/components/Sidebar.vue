<script setup lang="ts">
import {
  AnFilledPlaySquare,
  FaHorseHead,
  FlFilledHome,
  HiSolidGiftTop,
  LuBlocks,
} from "@kalimahapps/vue-icons";
import type { Component } from "vue";
import LinkButton from "./LinkButton.vue";

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
  <div class="w-64 p-2 flex flex-col gap-1 justify-start items-center">
    <LinkButton
      v-for="link in linksPrimary"
      :title="link.title"
      :icon="link.icon"
      :url="link.url"
      :isActive="link.isActive"
    />
    <span class="text-sm text-zinc-400 w-42 px-2 my-4 font-bold"> Sports </span>
    <LinkButton
      v-for="link in sports"
      :title="link.title"
      :icon="link.icon"
      :url="link.url"
      :isActive="link.isActive"
    />
  </div>
</template>
