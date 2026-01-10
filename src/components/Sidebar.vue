<script setup lang="ts">
import {
  AnFilledPlaySquare,
  BsGraphUp,
  CoWallet,
  FaHorse,
  FaHorseHead,
  FlFilledHome,
  HiSolidGiftTop,
  LuBlocks,
  LuReceipt,
  MaRacetrackHorse,
} from "@kalimahapps/vue-icons";

import { computed, type Component } from "vue";
import { useRoute } from "vue-router";

import LinkButton from "./LinkButton.vue";

const route = useRoute();

const isActive = (url: string) => {
  return route.path === url;
};

import { useAuthStore } from "@/stores/auth.store";

const auth = useAuthStore();

const isLogged = computed(() => auth.isAuthenticated);
const isAdmin = computed(() => auth.isAdmin);

interface NavLink {
  title: string;
  icon: Component;
  url: string;
}

const commonLinks: NavLink[] = [
  {
    title: "Home",
    icon: FlFilledHome,
    url: "/",
  },
  {
    title: "Rewards",
    icon: HiSolidGiftTop,
    url: "/rewards",
  },
  {
    title: "In-Play",
    icon: AnFilledPlaySquare,
    url: "/in-play",
  },
  {
    title: "Acca Builder",
    icon: LuBlocks,
    url: "/acca-builder",
  },
];

const sportsLinks: NavLink[] = [
  {
    title: "Horse Racing",
    icon: FaHorseHead,
    url: "/horses",
  },
];

const userLinks: NavLink[] = [
  {
    title: "Wallet",
    icon: CoWallet,
    url: "/user/wallet",
  },
  {
    title: "My bets",
    icon: LuReceipt,
    url: "/user/my-bets",
  },
  {
    title: "Results",
    icon: BsGraphUp,
    url: "/user/results",
  },
];

const adminLinks: NavLink[] = [
  {
    title: "Races register",
    icon: MaRacetrackHorse,
    url: "/admin/dashboard/races",
  },
  {
    title: "Horses register",
    icon: FaHorse,
    url: "/admin/dashboard/races",
  },
];
</script>

<template>
  <div class="flex flex-col gap-1 justify-start items-center w-full">
    <!-- Common links -->
    <LinkButton
      v-for="link in commonLinks"
      :title="link.title"
      :icon="link.icon"
      :url="link.url"
      :isActive="isActive(link.url)"
    />
    
    <template v-if="isAdmin">
      <!-- Admin menu links -->
      <span class="text-sm text-zinc-400 w-11/12 px-2 my-4 font-bold">
        Admin menu
      </span>

      <LinkButton
        v-for="link in adminLinks"
        :title="link.title"
        :icon="link.icon"
        :url="link.url"
        :isActive="isActive(link.url)"
      />
    </template>

    <!-- User menu links -->
    <span
      v-if="isLogged"
      class="text-sm text-zinc-400 w-11/12 px-2 my-4 font-bold"
    >
      Menu
    </span>

    <LinkButton
      v-for="link in userLinks"
      v-if="isLogged"
      :title="link.title"
      :icon="link.icon"
      :url="link.url"
      :isActive="isActive(link.url)"
    />

    <!-- Sports list -->
    <span class="text-sm text-zinc-400 w-11/12 px-2 my-4 font-bold">
      Sports
    </span>

    <LinkButton
      v-for="link in sportsLinks"
      :title="link.title"
      :icon="link.icon"
      :url="link.url"
      :isActive="isActive(link.url)"
    />
  </div>
</template>
