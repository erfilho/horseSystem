<script setup lang="ts">
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
    position: 1,
    name: "Jason Ginyu",
    jockey: "Arnaud Desmottes",
    trainer: "A. Desmottes",
    odds: "7/4",
    color: "bg-red-600",
    active: true,
  },
  {
    position: 2,
    name: "Nainpoints Lasse",
    jockey: "A. Abrivard",
    trainer: "J. Westholms",
    odds: "3/1",
    color: "bg-blue-600",
    active: false,
  },
  {
    position: 3,
    name: "Jilord Viva",
    jockey: "R. Raffin",
    trainer: "T. Julien Raffestin",
    odds: "7/3",
    color: "bg-yellow-500",
    active: false,
  },
  {
    position: 4,
    name: "Darlene Robertson",
    jockey: "Theresa Webb",
    trainer: "Robert Fox",
    odds: "10/4",
    color: "bg-zinc-700",
    active: false,
  },
];
</script>

<template>
  <div
    class="w-4/6 p-2 h-full flex flex-col gap-2 justify-start items-center rounded-xl"
  >
    <div class="min-h-screen bg-zinc-900 text-white w-full p-0 space-y-6">
      <!-- HEADER -->
      <div
        class="relative rounded-xl overflow-hidden bg-linear-to-r from-zinc-800 to-zinc-900 p-6"
        style="
          background-image: url('/horse.png');
          background-size: cover;
          background-position: 25%;
        "
      >
        <div class="flex items-center justify-between">
          <div class="flex flex-col gap-2">
            <h1 class="text-2xl font-semibold">Horse Racing</h1>

            <div class="flex gap-2 mt-2">
              <button
                v-for="tab in tabs"
                :key="tab.title"
                class="text-md p-2 rounded-lg font-bold"
                :class="
                  tab.active
                    ? 'bg-sky-500 hover:bg-sky-400'
                    : 'hover:bg-zinc-800'
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
            class="text-sm p-2 rounded-lg font-bold"
            :class="
              sub.active
                ? 'bg-teal-800 text-teal-300 hover:bg-teal-700'
                : 'bg-zinc-800 hover:bg-zinc-600'
            "
          >
            {{ sub.title }}
          </button>
        </div>

        <!-- TIME FILTER -->
        <div class="flex gap-3 overflow-x-auto py-2">
          <button
            v-for="time in [
              '17:05',
              '17:20',
              '17:35',
              '17:40',
              '17:50',
              '18:00',
              '18:05',
            ]"
            :key="time"
            class="min-w-20 px-4 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-center"
          >
            <div class="text-sm font-medium">{{ time }}</div>
            <div class="text-xs text-zinc-400">Vincennes</div>
          </button>
        </div>
      </div>

      <!-- RACE LIST -->
      <div class="bg-zinc-800 rounded-xl p-6 space-y-4">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-lg font-semibold">17:05 Vincennes</h2>
            <p class="text-sm text-zinc-400">
              1m 2f 96y / Standard / 12 Runners
            </p>
          </div>

          <button
            class="px-4 py-2 text-sm bg-zinc-700 rounded-lg hover:bg-zinc-600"
          >
            Watch
          </button>
        </div>

        <!-- RUNNERS -->
        <div class="divide-y divide-zinc-700">
          <div
            v-for="race in races"
            :key="race.position"
            class="flex items-center justify-between py-4"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-8 h-8 rounded flex items-center justify-center text-sm font-bold"
                :class="race.color"
              >
                {{ race.position }}
              </div>

              <div>
                <p class="font-medium">{{ race.name }}</p>
                <p class="text-xs text-zinc-400">
                  J: {{ race.jockey }} · T: {{ race.trainer }}
                </p>
              </div>
            </div>

            <button
              class="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-green-600 transition text-sm font-semibold"
            >
              {{ race.odds }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
