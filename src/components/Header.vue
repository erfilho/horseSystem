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
  languages.find((l) => l.value === lang.value)
);
</script>

<template>
  <div
    class="h-16 shrink-0 w-full mt-4 flex items-center justify-between px-10 border-b border-zinc-800"
  >
    <!-- LOGO -->
    <div class="flex items-center justify-center">
      <img src="/logo_sample.png" class="h-32" />
    </div>

    <!-- BUTTONS -->
    <div class="flex items-center gap-2">
      <Button
        variant="secondary"
        class="h-9 px-4 text-sm bg-df-bg hover:cursor-pointer text-white hover:bg-active-link gap-2"
      >
        <AnFilledPlayCircle
          class="text-white"
          style="width: 20px; height: 20px"
        />
        Live now
      </Button>
      <Button
        variant="secondary"
        class="h-9 px-4 text-sm font-bold bg-df-bg hover:cursor-pointer text-white hover:bg-active-link gap-2 flex items-center justify-center"
      >
        <BsClockHistory style="width: 20px; height: 20px" />
        Quick bets
      </Button>
      <Button
        variant="secondary"
        class="h-9 px-4 text-sm font-bold bg-df-bg hover:cursor-pointer text-white hover:bg-active-link gap-2 flex items-center justify-center"
      >
        <LuDices style="width: 20px; height: 20px" /> Live cassion
      </Button>
      <Button
        variant="secondary"
        class="h-9 px-4 text-sm font-bold bg-df-bg hover:cursor-pointer text-white hover:bg-active-link gap-2 flex items-center justify-center"
      >
        <BsCloudDrizzleFill style="width: 20px; height: 20px" /> Virtuals
      </Button>
    </div>

    <!-- LOGIN -->
    <div class="flex items-center gap-2">
      <!-- LANG SELECT -->
      <Select v-model="lang">
        <SelectTrigger
          class="border-0 bg-secondary-button text-white hover:bg-primary-button hover:cursor-pointer"
        >
          <template v-if="selectedLang">
            <div class="h-4 w-6 flex items-center justify-center">
              <img
                :src="selectedLang.flag"
                alt="flag"
                class="block max-h-full max-w-full object-contain rounded-xl"
              />
            </div>
            <span>{{ selectedLang.label }}</span>
          </template>
        </SelectTrigger>

        <SelectContent class="border-0 bg-secondary-button">
          <SelectItem
            v-for="item in languages"
            :key="item.value"
            :value="item.value"
            class="w-full text-white bg-secondary-button focus:bg-primary-button hover:bg-primary-button data-[state=checked]:bg-primary-button data-[state=checked]:text-white data-highlighted:bg-primary-button data-highlighted:text-white my-0.5 hover:cursor-pointer"
          >
            <div
              class="w-full flex items-center justify-center gap-2 leading-none"
            >
              <div class="h-4 w-6 flex items-center justify-center">
                <img
                  :src="item.flag"
                  alt="flag"
                  class="block max-h-full max-w-full object-contain rounded-xl"
                />
              </div>
              <span class="text-sm">
                {{ item.label }}
              </span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="secondary"
        class="h-9 text-sm font-bold bg-primary-button hover:cursor-pointer text-white hover:bg-zinc-600 flex items-center justify-center"
      >
        Log In
      </Button>
      <Button
        variant="secondary"
        class="h-9 px-4 text-sm font-bold bg-action-button hover:cursor-pointer text-white hover:bg-sky-400 flex items-center justify-center"
      >
        Join now
      </Button>
      <Button
        variant="secondary"
        class="h-9 px-4 text-sm font-bold bg-primary-button hover:cursor-pointer text-white hover:bg-zinc-600 flex items-center justify-center"
      >
        <AnOutlinedSearch />
      </Button>
    </div>
  </div>
</template>
