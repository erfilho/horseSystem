<script setup lang="ts">
import { computed, ref } from "vue";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import {
  AnFilledPlayCircle,
  AnOutlinedSearch,
  BsClockHistory,
  BsCloudDrizzleFill,
  LuDices,
} from "@kalimahapps/vue-icons";

import { Button } from "@/components/ui/button";
import router from "@/routes/router";
import { useAuthStore } from "@/stores/auth.store";

const auth = useAuthStore();

const isLogged = computed(() => auth.isAuthenticated);

const handleLogout = () => {
  auth.logout();
  router.push("/");
};

const lang = ref("ENG");

const languages = [
  {
    value: "ENG",
    label: "ENG",
    flag: "/UK_FLAG.svg",
  },
  {
    value: "POR",
    label: "POR",
    flag: "/BR_FLAG.svg",
  },
];

const selectedLang = computed(() =>
  languages.find((l) => l.value === lang.value),
);
</script>

<template>
  <header
    class="sticky top-0 z-50 h-full w-full grid grid-cols-[240px_1fr_340px] col-span-3 bg-bg-surface border-b border-white/5"
  >
    <!-- LOGO -->
    <div class="flex items-center justify-center">
      <RouterLink to="/" class="flex items-center gap-2">
        <img src="/10xbet.png" class="h-8" alt="10Bet logo" />
      </RouterLink>
    </div>

    <!-- NAV BUTTONS -->
    <nav class="flex items-center gap-2">
      <Button
        variant="secondary"
        class="h-9 px-4 text-sm font-semibold bg-transparent border border-transparent text-zinc-200 hover:bg-white/5 flex items-center gap-2"
      >
        <AnFilledPlayCircle class="w-5 h-5" />
        Live now
      </Button>
      <Button
        variant="secondary"
        class="h-9 px-4 text-sm font-semibold bg-transparent border border-transparent text-zinc-200 hover:bg-white/5 flex items-center gap-2"
      >
        <BsClockHistory class="w-5 h-5" />
        Quick bets
      </Button>
      <Button
        variant="secondary"
        class="h-9 px-4 text-sm font-semibold bg-transparent border border-transparent text-zinc-200 hover:bg-white/5 flex items-center gap-2"
      >
        <LuDices class="w-5 h-5" />
        Live casino
      </Button>
      <Button
        variant="secondary"
        class="h-9 px-4 text-sm font-semibold bg-transparent border border-transparent text-zinc-200 hover:bg-white/5 flex items-center gap-2"
      >
        <BsCloudDrizzleFill class="w-5 h-5" />
        Virtuals
      </Button>
    </nav>

    <!-- LADO DIREITO: LANG + LOGIN -->
    <div class="flex items-center justify-start gap-2">
      <!-- LANG SELECT -->
      <Select v-model="lang">
        <SelectTrigger
          class="h-9 w-24 border border-white/10 bg-zinc-900 text-sm text-white hover:bg-zinc-800"
        >
          <template v-if="selectedLang">
            <div class="h-4 w-6 flex items-center justify-center">
              <img
                :src="selectedLang.flag"
                alt="flag"
                class="block max-h-full max-w-full object-contain rounded-sm"
              />
            </div>
            <span>{{ selectedLang.label }}</span>
          </template>
        </SelectTrigger>

        <SelectContent class="border-0 bg-zinc-900 text-white">
          <SelectItem
            v-for="item in languages"
            :key="item.value"
            :value="item.value"
            class="text-sm hover:bg-zinc-800 data-[state=checked]:bg-zinc-800"
          >
            <div class="flex items-center gap-2">
              <div class="h-4 w-6 flex items-center justify-center">
                <img
                  :src="item.flag"
                  alt="flag"
                  class="block max-h-full max-w-full object-contain rounded-sm"
                />
              </div>
              <span>{{ item.label }}</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <!-- NÃO AUTENTICADO -->
      <template v-if="!isLogged">
        <RouterLink to="/login">
          <Button
            variant="secondary"
            class="h-9 px-4 text-sm font-semibold bg-transparent border border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white"
          >
            Log in
          </Button>
        </RouterLink>

        <RouterLink to="/register">
          <Button
            variant="secondary"
            class="h-9 px-4 text-sm font-semibold bg-sky-500 text-white hover:bg-sky-400"
          >
            Join now
          </Button>
        </RouterLink>
      </template>

      <!-- AUTENTICADO -->
      <template v-else>
        <RouterLink to="/user/profile">
          <Button
            variant="secondary"
            class="h-9 px-4 text-sm font-semibold bg-zinc-800 text-white hover:bg-zinc-700"
          >
            Profile
          </Button>
        </RouterLink>

        <Button
          variant="secondary"
          class="h-9 px-4 text-sm font-semibold bg-sky-500 text-white hover:bg-sky-400"
          @click="handleLogout"
        >
          Logout
        </Button>
      </template>

      <!-- SEARCH -->
      <Button
        variant="secondary"
        class="h-9 w-9 flex items-center justify-center bg-zinc-900 text-white hover:bg-zinc-800"
      >
        <AnOutlinedSearch class="w-4 h-4" />
      </Button>
    </div>
  </header>
</template>
