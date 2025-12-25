<script setup lang="ts">
import { AnFilledPlayCircle } from "@kalimahapps/vue-icons";

import RaceCard from "./RaceCard.vue";
import RacerCard from "./RacerCard.vue";

import { useBetSlipStore } from "@/stores/betSlip.store";

const betSlip = useBetSlipStore();

interface RaceCards {
  time: string;
  local: string;
  isLiveNow: boolean;
}

const tabs = [
  { title: "Next Races", active: true },
  { title: "Meetings", active: false },
  { title: "Specials", active: false },
];

const subTabs = [
  { title: "All Races", active: true },
  { title: "Meetings", active: false },
  { title: "Specials", active: false },
];

const races = [
  {
    shirtNumber: 1,
    horse: "Jason Ginyu",
    jockey: "Arnaud Desmottes",
    trainer: "A. Desmottes",
    odds: "7/4",
    color: "text-red-600",
    active: true,
    horseAge: 6,
    formCode: "nyajw333C098",
    lastOdds: "15/8 > 7/4 > 15/8",
  },
  {
    shirtNumber: 2,
    horse: "Nainpoints Lasse",
    jockey: "A. Abrivard",
    trainer: "J. Westholms",
    odds: "3/1",
    color: "text-blue-600",
    active: false,
    horseAge: 6,
    formCode: "nyajw333C098",
    lastOdds: "15/8 > 7/4 > 15/8",
  },
  {
    shirtNumber: 3,
    horse: "Jilord Viva",
    jockey: "R. Raffin",
    trainer: "T. Julien Raffestin",
    odds: "7/3",
    color: "text-yellow-500",
    active: false,
    horseAge: 6,
    formCode: "nyajw333C098",
    lastOdds: "15/8 > 7/4 > 15/8",
  },
  {
    shirtNumber: 4,
    horse: "Darlene Robertson",
    jockey: "Theresa Webb",
    trainer: "Robert Fox",
    odds: "10/4",
    color: "text-zinc-700",
    active: false,
    horseAge: 6,
    formCode: "nyajw333C098",
    lastOdds: "15/8 > 7/4 > 15/8",
  },
];

const racesTimeLine: RaceCards[] = [
  {
    time: "17:05",
    local: "Vincennes",
    isLiveNow: true,
  },
  {
    time: "17:20",
    local: "Toulouse",
    isLiveNow: false,
  },
  {
    time: "17:35",
    local: "Vincennes",
    isLiveNow: false,
  },
];

function addToBetSlip(race: any) {
  betSlip.addSelection({
    raceId: "17:05 Vincennes",
    raceName: "17:05 Vincennes",
    horseId: race.horse,
    horseName: race.horse,
    odds: 5.7,
    type: "win",
    shirtColor: race.color,
  });
}
</script>

<template>
  <div
    class="w-4/6 p-2 flex flex-1 flex-col gap-2 justify-start items-center rounded-xl"
  >
    <div class="text-white w-full p-0 space-y-6">
      <!-- HEADER -->
      <div
        class="relative rounded-xl overflow-hidden p-6"
        style="
          background-image: url('/horse.png');
          background-size: cover;
          background-position: 10%;
        "
      >
        <div
          class="absolute inset-0 bg-linear-to-tr from-black/90 via-black/70 to-transparent"
        ></div>

        <div class="relative z-10">
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-2">
              <h1 class="text-2xl font-semibold">Horse Racing</h1>

              <!-- Main races tabs -->
              <div class="flex gap-2 mt-2">
                <button
                  v-for="tab in tabs"
                  :key="tab.title"
                  class="text-md p-2 rounded-lg font-bold hover:cursor-pointer"
                  :class="
                    tab.active
                      ? 'bg-action-button hover:bg-sky-400'
                      : 'hover:bg-action-button'
                  "
                >
                  {{ tab.title }}
                </button>
              </div>
              <div class="w-full border-b border-zinc-800"></div>
            </div>
          </div>

          <!-- Sub Tabs -->
          <div class="flex flex-row gap-2 py-2">
            <button
              v-for="sub in subTabs"
              :key="sub.title"
              class="text-sm p-2 rounded-lg font-bold hover:cursor-pointer"
              :class="
                sub.active
                  ? 'bg-filter-button text-teal-400 hover:bg-teal-800'
                  : 'bg-secondary-button hover:bg-primary-button'
              "
            >
              {{ sub.title }}
            </button>
          </div>

          <!-- Races Timeline -->
          <div class="flex gap-3 overflow-x-auto py-2">
            <RaceCard
              v-for="race in racesTimeLine"
              :key="race.time"
              :time="race.time"
              :local="race.local"
              :isLiveNow="race.isLiveNow"
            />
          </div>
        </div>
      </div>

      <!-- Race Details -->
      <div class="bg-content-bg rounded-xl p-6 space-y-4">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-lg font-semibold">17:05 Vincennes</h2>
            <p class="text-sm text-zinc-400">
              1m 2f 96y / Standard / 12 Runners
            </p>
          </div>

          <button
            class="px-4 py-2 text-sm bg-zinc-700 rounded-lg hover:bg-zinc-600 flex items-center gap-2 h-12"
          >
            <AnFilledPlayCircle class="text-lg" /> Watch
          </button>
        </div>

        <!-- Race Runners -->
        <div class="divide-y divide-zinc-700">
          <RacerCard
            v-for="race in races"
            :key="race.horse"
            :shirtColor="race.color"
            @select="addToBetSlip"
            v-bind="race"
          />
        </div>
      </div>
    </div>
  </div>
</template>
