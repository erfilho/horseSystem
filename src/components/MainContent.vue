<script setup lang="ts">
import { useBetSlipStore } from "@/stores/betSlip.store";
import { AnFilledPlayCircle } from "@kalimahapps/vue-icons";
import { ref } from "vue";
import RaceCard from "./RaceCard.vue";
import RacerCard from "./RacerCard.vue";

const betSlip = useBetSlipStore();

const heroTabs = ref([
  { id: "racing", title: "Horse Racing" },
  { id: "inplay", title: "In-Play" },
  { id: "promos", title: "Promos" },
]);
const activeHeroTab = ref("racing");

const racesTimeLine = [
  { time: "17:05", local: "Vincennes", isLiveNow: true },
  { time: "17:20", local: "Toulouse", isLiveNow: false },
  { time: "17:35", local: "Vincennes", isLiveNow: false },
];

const races = [
  {
    shirtNumber: 1,
    horse: "Jason Ginyu",
    jockey: "Arnaud Desmottes",
    trainer: "A. Desmottes",
    odds: 7.4,
    color: "text-red-600",
    active: true,
    horseAge: 6,
    formCode: "nyajw333C098",
    lastOdds: "15/8 > 7/4 > 15/8",
  },
  // ... outros races iguais ao original
];

function addToBetSlip(race: any) {
  betSlip.addSelection({
    raceId: "test",
    horseId: race.horse,
    horseName: race.horse,
    raceName: "17:05 Vincennes",
    shirtColor: race.color,
    bet: "win",
    oddType: "SP",
    odds: race.odds,
  });
}
</script>

<template>
  <main class="flex flex-col gap-6 px-6 py-4 bg-bg-main text-white">
    <!-- BANNER -->
    <section
      class="relative h-60 rounded-xl overflow-hidden border border-white/5"
      style="
        background:
          linear-gradient(
            to right,
            rgba(15, 20, 26, 0.95),
            rgba(15, 20, 26, 0.4)
          ),
          url(&quot;horsess.png&quot;) center right / cover no-repeat;
      "
    >
      <div class="absolute inset-0">
        <!-- PAGE HEADER -->
        <section class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-semibold">Horse Racing</h1>

            <div class="flex gap-4 mt-2 text-sm">
              <button class="bg-accent-blue font-bold text-lg px-2 rounded-lg">
                Next Races
              </button>
              <button class="text-white/60 hover:text-white">Meetings</button>
              <button class="text-white/60 hover:text-white">Specials</button>
            </div>
          </div>
        </section>

        <!-- TIMELINE -->
        <section>
          <div class="flex gap-2 overflow-x-auto">
            <RaceCard
              v-for="race in racesTimeLine"
              :key="race.time"
              v-bind="race"
            />
          </div>
        </section>
      </div>
    </section>

    <!-- RACE DETAILS -->
    <section class="bg-bg-surface border border-white/5 rounded-lg">
      <!-- HEADER -->
      <div
        class="flex items-center justify-between px-4 py-3 border-b border-white/5"
      >
        <div>
          <h2 class="text-lg font-semibold">17:05 Vincennes</h2>
          <p class="text-sm text-white/50">1m 2f 96y / Standard / 12 Runners</p>
        </div>

        <button
          class="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#1e2a33] hover:bg-[#26323c] rounded"
        >
          <AnFilledPlayCircle />
          Watch
        </button>
      </div>

      <!-- TABLE HEADER -->
      <div
        class="grid grid-cols-[40px_1fr_1.2fr_100px_60px_80px] px-4 py-2 text-xs text-white/50 border-b border-white/5"
      >
        <span>#</span>
        <span>Horse</span>
        <span>Jockey / Trainer</span>
        <span>Form</span>
        <span>Age</span>
        <span class="text-right">Odds</span>
      </div>

      <!-- ROWS -->
      <div class="divide-y divide-white/5">
        <RacerCard
          v-for="race in races"
          :key="race.horse"
          @select="addToBetSlip(race)"
          :shirtColor="race.color"
          :shirtNumber="race.shirtNumber"
          :horse="race.horse"
          :horseAge="race.horseAge"
          :jockey="race.jockey"
          :trainer="race.trainer"
          :formCode="race.formCode"
          :lastOdds="race.lastOdds"
          :odds="race.odds"
        />
      </div>
    </section>
  </main>
</template>
