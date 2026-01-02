<script setup lang="ts">
import { computed, ref } from "vue";

import { useAdminRacesStore } from "@/stores/adminRace.store";
import { useHorsesStore } from "@/stores/horses.store";
import { useRaceHorseStore } from "@/stores/useRaceHorses.store";

import RaceForm, { type RaceFormModel } from "@/components/races/RaceForm.vue";
import BaseModal from "@/components/ui/BaseModal.vue";

import type { RaceStatus } from "@/types/RaceStatus";

const adminRaces = useAdminRacesStore();
const horsesStore = useHorsesStore();
const raceHorsesStore = useRaceHorseStore();

const races = computed(() => adminRaces.races);
const horses = computed(() => horsesStore.horses);

const isVisibleForm = ref(false);

const statusOptions: { label: string; status: RaceStatus }[] = [
  { label: "Scheduled", status: "scheduled" },
  { label: "Open", status: "open" },
  { label: "Closed", status: "closed" },
  { label: "Finshed", status: "finished" },
];

const form = ref<RaceFormModel>({
  name: "",
  startTime: "12:00",
  finishTime: "12:10",
  status: "open" as RaceStatus,
  horseIds: [],
});

const toggleForm = () => {
  isVisibleForm.value = !isVisibleForm.value;
};

function resetForm() {
  form.value = {
    name: "",
    startTime: "12:00",
    finishTime: "12:10",
    status: "open",
    horseIds: [],
  };
}

function createRace() {
  const raceId = crypto.randomUUID();

  adminRaces.createRace({
    id: raceId,
    name: form.value.name,
    startTime: form.value.startTime,
    finishTime: form.value.finishTime,
    status: form.value.status,
  });

  form.value.horseIds.forEach(({ horseId, odd }) => {
    raceHorsesStore.addHorseToRace(raceId, horseId, odd);
  });

  console.log(form.value.horseIds);

  resetForm();
  toggleForm();
}

function removeRace(id: string) {
  if (confirm("Delete this race?")) {
    adminRaces.removeRace(id);
    raceHorsesStore.clearRace(id);
  }
}

const getRunnersCount = (raceId: string) => {
  return raceHorsesStore.getHorsesByRace(raceId).length;
};
</script>

<template>
  <div
    class="p-6 text-white space-y-6 flex flex-col justify-center items-center w-full h-screen"
  >
    <!-- Race register form -->
    <BaseModal :show="isVisibleForm" @close="toggleForm">
      <RaceForm
        v-model="form"
        :horses="horses"
        :status-options="statusOptions"
        @submit="createRace"
        @cancel="toggleForm"
      />
    </BaseModal>

    <!-- Races dashboard -->
    <div
      class="w-2/4 h-full items-center flex flex-col bg-content-bg p-2 rounded-xl"
    >
      <div class="flex justify-around flex-row w-full py-2">
        <h1 class="text-2xl font-bold">Races Dashboard</h1>

        <button
          class="bg-action-button px-4 py-2 rounded-lg cursor-pointer"
          @click="toggleForm"
        >
          + New Race
        </button>
      </div>

      <div class="space-y-3 w-2/3">
        <div
          v-for="race in races"
          :key="race.id"
          class="bg-content-bg p-4 rounded-lg flex justify-between items-center"
        >
          <div>
            <p class="font-semibold">
              {{ race.name }} - {{ race.startTime }} / {{ race.finishTime }}
            </p>
            <p class="text-sm text-zinc-400">
              {{ getRunnersCount(race.id) }} runners · {{ race.status }}
            </p>
          </div>

          <div class="flex gap-2">
            <button
              class="px-3 py-1 bg-sky-600 rounded cursor-pointer"
              @click="adminRaces.updateStatus(race.id, 'open')"
            >
              Edit
            </button>
            <button
              class="px-3 py-1 bg-red-600 rounded cursor-pointer"
              @click="removeRace(race.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
