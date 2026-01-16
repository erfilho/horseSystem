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
  <main class="flex flex-col gap-6">
    <!-- Hero Section -->
    <section
      class="relative h-80 rounded-xl overflow-hidden border border-white/5 bg-cover bg-center"
      style="background-image: url(&quot;/hero-horses.jpg&quot;)"
    >
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent"
      ></div>
      <div class="relative z-10 flex flex-col h-full justify-between p-8">
        <div class="max-w-md space-y-4">
          <h1 class="text-4xl font-bold tracking-tight drop-shadow-lg">
            All Sports. One Betting Power.
          </h1>
          <div class="flex gap-2">
            <input
              placeholder="Search races, horses..."
              class="flex-1 px-4 py-2 bg-black/40 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-sky-500"
            />
            <button
              class="px-6 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-400"
            >
              Login
            </button>
          </div>
          <div
            class="inline-flex bg-black/50 backdrop-blur-sm rounded-full p-1"
          >
            <button
              v-for="tab in heroTabs"
              :key="tab.id"
              class="px-4 py-2 text-sm font-semibold rounded-full transition-all"
              :class="
                activeHeroTab === tab.id
                  ? 'bg-sky-500 text-white shadow-lg'
                  : 'text-zinc-300 hover:bg-white/10'
              "
              @click="activeHeroTab = tab.id"
            >
              {{ tab.title }}
            </button>
          </div>
        </div>
        <!-- Balance Teaser (simulado) -->
        <div
          class="self-end bg-content-bg/90 backdrop-blur-sm rounded-xl p-4 border border-white/10 w-64"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-zinc-400">Saldo</span>
            <span class="text-lg font-bold text-white">€145.50</span>
          </div>
          <div class="flex gap-2 text-xs">
            <button
              class="flex-1 py-1.5 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-400"
            >
              Depositar
            </button>
            <button
              class="flex-1 py-1.5 bg-zinc-700 text-zinc-200 rounded-lg hover:bg-zinc-600"
            >
              Sacar
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline Carrossel -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Próximas Corridas</h2>
      <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <RaceCard
          v-for="race in racesTimeLine"
          :key="race.time"
          v-bind="race"
        />
      </div>
    </section>

    <!-- Corrida Destaque -->
    <section
      class="bg-content-bg rounded-xl p-6 border border-white/5 space-y-4"
    >
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold">17:05 Vincennes</h2>
          <p class="text-sm text-zinc-400">1m 2f 96y / Standard / 12 Runners</p>
        </div>
        <button
          class="px-4 py-2 text-sm bg-zinc-700 rounded-lg hover:bg-zinc-600 flex items-center gap-2"
        >
          <AnFilledPlayCircle class="text-lg" /> Ao Vivo
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

    <!-- Promoções Carrossel -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Promoções</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          class="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-xl p-6 text-center hover:scale-105 transition-transform"
        >
          <h3 class="text-lg font-bold mb-2">Bet €10 Get €30</h3>
          <p class="text-zinc-300 mb-4">Em corridas selecionadas</p>
          <button
            class="w-full py-2 bg-emerald-500 text-white rounded-lg font-semibold"
          >
            Reivindicar
          </button>
        </div>
        <!-- Adicionar mais cards de promo -->
      </div>
    </section>
  </main>
</template>
