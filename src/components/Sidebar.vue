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
  { title: "Carteira", icon: CoWallet, url: "/user/wallet" },
  { title: "Minhas apostas", icon: LuReceipt, url: "/user/my-bets" },
  { title: "Resultados", icon: BsGraphUp, url: "/user/results" },
];

const adminLinks: NavLink[] = [
  {
    title: "Cadastro de corridas",
    icon: MaRacetrackHorse,
    url: "/admin/dashboard/races",
  },
  {
    title: "Cadastro de cavalos",
    icon: FaHorse,
    url: "/admin/dashboard/horses",
  },
];
</script>

<template>
  <aside class="h-full overflow-y-auto flex flex-col gap-4 px-2 py-4 pl-12">
    <template v-if="isAdmin">
      <p
        class="mt-4 mb-1 text-[11px] uppercase tracking-wide text-zinc-500 px-2"
      >
        Menu Administrador
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
      Esportes
    </p>
    <nav class="flex flex-col gap-1">
      <LinkButton
        v-for="link in sportsLinks"
        :key="link.url"
        v-bind="link"
        :isActive="isActive(link.url)"
      />
    </nav>

    <p class="mb-1 text-[11px] uppercase text-zinc-500 px-2">Atalhos</p>
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
