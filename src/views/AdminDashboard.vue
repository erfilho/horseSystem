<script setup lang="ts">
import { useAdminRacesStore } from "@/stores/adminRace.store";
import { computed } from "vue";

const adminRaces = useAdminRacesStore();

const races = computed(() => adminRaces.races);

function createRace() {
  adminRaces.createRace({
    id: crypto.randomUUID(),
    name: "John Doe",
    startTime: "18:10",
    location: "Vincennes",
    status: "scheduled",
    horses: [
      {
        id: "Test",
        name: "John Doe",
        age: 6,
        odds: 5.7,
        jockey: "Anne Doe",
      },
    ],
  });
}
</script>

<template>
  <div class="p-6 text-white space-y-6">
    <header class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Admin · Races</h1>
      <button class="bg-action-button px-4 py-2 rounded-lg" @click="createRace">
        + New Race
      </button>
    </header>

    <div class="space-y-3">
      <div
        v-for="race in races"
        :key="race.id"
        class="bg-content-bg p-4 rounded-lg flex justify-between items-center"
      >
        <div>
          <p class="font-semibold">
            {{ race.startTime }} · {{ race.location }}
          </p>
          <p class="text-sm text-zinc-400">
            {{ race.horses.length }} runners · {{ race.status }}
          </p>
        </div>

        <div class="flex gap-2">
          <button
            class="px-3 py-1 bg-zinc-700 rounded"
            @click="adminRaces.updateStatus(race.id, 'open')"
          >
            Open
          </button>
          <button
            class="px-3 py-1 bg-yellow-600 rounded"
            @click="adminRaces.updateStatus(race.id, 'scheduled')"
          >
            Live
          </button>
          <button
            class="px-3 py-1 bg-red-600 rounded"
            @click="adminRaces.updateStatus(race.id, 'finished')"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
