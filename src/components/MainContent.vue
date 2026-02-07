<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useBetSlipStore } from "@/stores/betSlip.store";
import { AnFilledPlayCircle, CaArrowsHorizontal } from "@kalimahapps/vue-icons";
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
  <main class="flex flex-col gap-6 px-3 py-4 bg-bg-main text-white">
    <!-- BANNER -->
    <section
      class="relative h-72 py-1 rounded-xl overflow-hidden"
      style="
        background:
          linear-gradient(
            to right,
            rgba(20, 26, 33, 0.95),
            rgba(15, 20, 26, 0.4)
          ),
          url(&quot;horsess.png&quot;) center right / cover no-repeat;
      "
    >
      <div
        class="absolute inset-0 w-full h-full flex flex-col justify-between py-1"
      >
        <!-- PAGE HEADER -->
        <section
          class="flex flex-col h-full items-start justify-between px-4 py-2"
        >
          <!-- HEADER TEXT -->
          <div class="w-full pt-2">
            <h1 class="text-3xl font-semibold">Horse Racing</h1>
          </div>

          <div>
            <!-- FILTERS -->
            <div class="flex gap-4 mt-2 py-2">
              <Button
                variant="default"
                size="default"
                class="bg-accent-blue font-bold rounded-lg"
              >
                Next Races
              </Button>
              <Button variant="default"> Meetings </Button>
              <Button variant="default"> Specials </Button>
            </div>

            <!-- FILTERS -->
            <div
              class="flex gap-4 mt-2 py-2 w-full border-t border-amber-50/10"
            >
              <Button
                variant="default"
                size="default"
                class="bg-filter-button text-emerald-300 font-bold rounded-lg"
              >
                All Races
              </Button>
              <Button variant="default" class="bg-secondary-button">
                Meetings
              </Button>
              <Button variant="default" class="bg-secondary-button">
                Specials
              </Button>
            </div>
          </div>

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
    <section class="bg-bg-surface rounded-xl p-3">
      <!-- HEADER -->
      <div
        class="flex flex-row items-center justify-between p-3 border-b border-white/5"
      >
        <div class="h-full flex flex-col gap-2">
          <h2 class="text-xl font-semibold">17:05 Vincennes</h2>
          <p class="text-white/50">1m 2f 96y / Standard / 12 Runners</p>
          <p class="">Em breve</p>
        </div>

        <div class="h-full flex flex-col items-end justify-between gap-2">
          <Button
            variant="secondary"
            size="lg"
            class="bg-primary-button hover:bg-[#26323c] rounded-lg flex items-center"
          >
            <AnFilledPlayCircle />
            Watch
          </Button>

          <Button
            variant="secondary"
            size="lg"
            class="bg-filter-button text-emerald-300 hover:bg-[#26323c] rounded-lg flex items-center"
          >
            <CaArrowsHorizontal />
            E/W 1/5 Odds, 3 places
          </Button>
        </div>
      </div>

      <!-- ROWS -->
      <div class="p-3">
        <RacerCard
          v-for="race in races"
          :key="race.horse"
          :shirtColor="race.color"
          :shirtNumber="race.shirtNumber"
          :horse="race.horse"
          :horseAge="race.horseAge"
          :jockey="race.jockey"
          :trainer="race.trainer"
          :formCode="race.formCode"
          :lastOdds="race.lastOdds"
          :odds="race.odds"
          @select="addToBetSlip(race)"
        />
      </div>
    </section>
  </main>
</template>
