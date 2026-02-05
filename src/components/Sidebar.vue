<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";
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
const auth = useAuthStore();

const isLogged = computed(() => auth.isAuthenticated);
const isAdmin = computed(() => auth.isAdmin);

const isActive = (url: string) => route.path === url;

interface NavLink {
  title: string;
  icon: Component;
  url: string;
}

const commonLinks: NavLink[] = [
  { title: "Home", icon: FlFilledHome, url: "/" },
  { title: "Rewards", icon: HiSolidGiftTop, url: "/rewards" },
  { title: "In-Play", icon: AnFilledPlaySquare, url: "/in-play" },
  { title: "Acca Builder", icon: LuBlocks, url: "/acca-builder" },
];

const sportsLinks: NavLink[] = [
  { title: "Horse Racing", icon: FaHorseHead, url: "/horses" },
];

const userLinks: NavLink[] = [
  { title: "Wallet", icon: CoWallet, url: "/user/wallet" },
  { title: "My bets", icon: LuReceipt, url: "/user/my-bets" },
  { title: "Results", icon: BsGraphUp, url: "/user/results" },
];

const adminLinks: NavLink[] = [
  {
    title: "Races register",
    icon: MaRacetrackHorse,
    url: "/admin/dashboard/races",
  },
  { title: "Horses register", icon: FaHorse, url: "/admin/dashboard/horses" },
];
</script>

<template>
  <aside
    class="h-full overflow-y-auto border-r border-white/5 flex flex-col gap-4 px-2 py-3"
  >
    <template v-if="isAdmin">
      <p
        class="mt-4 mb-1 text-[11px] uppercase tracking-wide text-zinc-500 px-2"
      >
        Admin menu
      </p>
      <nav class="flex flex-col gap-1">
        <LinkButton
          v-for="link in adminLinks"
          :key="link.url"
          v-bind="link"
          :isActive="isActive(link.url)"
        />
      </nav>
    </template>

    <template v-if="isLogged">
      <p
        class="mt-4 mb-1 text-[11px] uppercase tracking-wide text-zinc-500 px-2"
      >
        Menu
      </p>
      <nav class="flex flex-col gap-1">
        <LinkButton
          v-for="link in userLinks"
          :key="link.url"
          v-bind="link"
          :isActive="isActive(link.url)"
        />
      </nav>
    </template>

    <p class="mt-4 mb-1 text-[11px] uppercase tracking-wide text-zinc-500 px-2">
      Sports
    </p>
    <nav class="flex flex-col gap-1">
      <LinkButton
        v-for="link in sportsLinks"
        :key="link.url"
        v-bind="link"
        :isActive="isActive(link.url)"
      />
    </nav>

    <p class="mb-1 text-[11px] uppercase text-zinc-500 px-2">Quick</p>
    <nav class="flex flex-col gap-1">
      <LinkButton
        v-for="link in commonLinks"
        :key="link.url"
        v-bind="link"
        :isActive="isActive(link.url)"
      />
    </nav>
  </aside>
</template>
