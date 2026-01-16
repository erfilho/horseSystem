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
  status: "open",
  horseIds: [],
});

const toggleForm = () => (isVisibleForm.value = !isVisibleForm.value);

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

  toggleForm();
}

function removeRace(id: string) {
  if (confirm("Delete this race?")) {
    adminRaces.removeRace(id);
    raceHorsesStore.clearRace(id);
  }
}

const getRunnersCount = (raceId: string) =>
  raceHorsesStore.getHorsesByRace(raceId).length;
</script>

<template>
  <!-- PAGE BACKGROUND -->
  <div
    class="min-h-screen w-full bg-linear-to-br from-[#08162f] via-[#0b1f3f] to-[#020617] text-white p-6 col-span-3"
  >
    <!-- MODAL -->
    <BaseModal :show="isVisibleForm" @close="toggleForm">
      <RaceForm
        v-model="form"
        :horses="horses"
        :status-options="statusOptions"
        @submit="createRace"
        @cancel="toggleForm"
      />
    </BaseModal>

    <!-- HEADER -->
    <div class="max-w-7xl mx-auto mb-6">
      <h1 class="text-2xl font-semibold tracking-wide">
        HORSE RACE REGISTRATION
      </h1>
    </div>

    <!-- MAIN CARD -->
    <div
      class="max-w-7xl mx-auto bg-[#0b1220]/90 backdrop-blur rounded-2xl shadow-2xl p-6"
    >
      <!-- TOP ACTION -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg font-semibold">Add New Race</h2>
      </div>

      <!-- CONTENT GRID -->
      <div class="grid grid-cols-3 gap-6">
        <!-- LEFT COLUMN -->
        <div class="col-span-1 space-y-4">
          <div class="bg-[#111827] p-4 rounded-xl border border-gray-700">
            <p class="text-sm text-gray-400">
              Use the button above to create a new race, configure its time,
              status and participating horses.
            </p>

            <button
              class="mt-4 w-full bg-blue-600 hover:bg-blue-500 transition py-2 rounded-lg"
              @click="toggleForm"
            >
              Add Race
            </button>
          </div>
        </div>

        <!-- RIGHT COLUMN -->
        <div class="col-span-2">
          <div class="bg-[#111827] rounded-xl border border-gray-700">
            <!-- TABLE HEADER -->
            <div class="px-4 py-3 border-b border-gray-700">
              <h3 class="font-semibold">Registered Races</h3>
            </div>

            <!-- LIST -->
            <div class="divide-y divide-gray-800">
              <div
                v-for="race in races"
                :key="race.id"
                class="px-4 py-3 flex justify-between items-center hover:bg-[#1f2937] transition"
              >
                <div>
                  <p class="font-medium">
                    {{ race.name }}
                  </p>
                  <p class="text-sm text-gray-400">
                    {{ race.startTime }} - {{ race.finishTime }} ·
                    {{ getRunnersCount(race.id) }} horses · {{ race.status }}
                  </p>
                </div>

                <div class="flex gap-2">
                  <button
                    class="px-3 py-1 bg-sky-600 rounded"
                    @click="adminRaces.updateStatus(race.id, 'open')"
                  >
                    Edit
                  </button>
                  <button
                    class="px-3 py-1 bg-red-600 rounded"
                    @click="removeRace(race.id)"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div
                v-if="!races.length"
                class="px-4 py-6 text-center text-gray-400"
              >
                No races registered
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
