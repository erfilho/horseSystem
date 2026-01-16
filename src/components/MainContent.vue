<script setup lang="ts">
import { useBetSlipStore } from "@/stores/betSlip.store";
import { AnFilledPlayCircle } from "@kalimahapps/vue-icons";
import { ref } from "vue";
import RaceCard from "./RaceCard.vue";
import RacerCard from "./RacerCard.vue";

const betSlip = useBetSlipStore();

interface RaceCards {
  time: string;
  local: string;
  isLiveNow: boolean;
}

const tabs = ref([
  { id: "next", title: "Next Races" },
  { id: "meetings", title: "Meetings" },
  { id: "specials", title: "Specials" },
]);
const activeTab = ref<"next" | "meetings" | "specials">("next");

const subTabs = ref([
  { id: "all", title: "All Races" },
  { id: "meetings", title: "Meetings" },
  { id: "specials", title: "Specials" },
]);
const activeSubTab = ref<"all" | "meetings" | "specials">("all");

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
  {
    shirtNumber: 2,
    horse: "Nainpoints Lasse",
    jockey: "A. Abrivard",
    trainer: "J. Westholms",
    odds: 3.1,
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
    odds: 7.3,
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
    odds: 10.4,
    color: "text-zinc-700",
    active: false,
    horseAge: 6,
    formCode: "nyajw333C098",
    lastOdds: "15/8 > 7/4 > 15/8",
  },
];

const racesTimeLine: RaceCards[] = [
  { time: "17:05", local: "Vincennes", isLiveNow: true },
  { time: "17:20", local: "Toulouse", isLiveNow: false },
  { time: "17:35", local: "Vincennes", isLiveNow: false },
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
  <main class="flex flex-col gap-4 rounded-xl">
    <div
      class="relative rounded-xl overflow-hidden h-64 bg-[#0b1220] border border-white/5"
      style="
        background-image: url('/horsess.png');
        background-size: cover;
        background-position: center right;
      "
    >
      <div
        class="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-transparent"
      ></div>

      <div class="relative z-10 h-full flex flex-col justify-between p-6">
        <!-- Título + tabs -->
        <div class="w-1/2 space-y-3">
          <h1 class="text-3xl font-bold tracking-tight">Horse Racing</h1>

          <div class="inline-flex bg-black/40 rounded-full p-1">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              class="px-4 py-1.5 text-xs font-semibold rounded-full transition uppercase tracking-wide"
              :class="
                activeTab === tab.id
                  ? 'bg-sky-500 text-white'
                  : 'text-zinc-300 hover:bg-white/5'
              "
              @click="activeTab = tab.id as any"
            >
              {{ tab.title }}
            </button>
          </div>
        </div>

        <!-- Subtabs + timeline -->
        <div class="space-y-3">
          <div class="inline-flex bg-black/40 rounded-full p-1">
            <button
              v-for="sub in subTabs"
              :key="sub.id"
              class="px-3 py-1.5 text-[11px] font-semibold rounded-full uppercase tracking-wide"
              :class="
                activeSubTab === sub.id
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'text-zinc-300 hover:bg-white/5'
              "
              @click="activeSubTab = sub.id as any"
            >
              {{ sub.title }}
            </button>
          </div>

          <div class="flex gap-3 overflow-x-auto pb-1">
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
    </div>

    <!-- Detalhes da corrida -->
    <section
      class="bg-[#0b1220] rounded-xl p-5 border border-white/5 space-y-4"
    >
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold">17:05 Vincennes</h2>
          <p class="text-xs text-zinc-400">1m 2f 96y / Standard / 12 Runners</p>
        </div>

        <button
          class="px-4 py-2 text-xs bg-zinc-700 rounded-lg hover:bg-zinc-600 flex items-center gap-2 h-9"
        >
          <AnFilledPlayCircle class="text-base" />
          Watch
        </button>
      </div>

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
