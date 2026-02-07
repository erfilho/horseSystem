<script setup lang="ts">
import { computed, ref } from "vue";

import { useAdminRacesStore } from "@/stores/adminRace.store";
import { useHorsesStore } from "@/stores/horses.store";
import { useRaceHorseStore } from "@/stores/useRaceHorses.store";

import RaceForm, { type RaceFormModel } from "@/components/races/RaceForm.vue";
import BaseModal from "@/components/ui/BaseModal.vue";

import Sidebar from "@/components/Sidebar.vue";
import { Button } from "@/components/ui/button";

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
    class="min-h-screen w-full text-white grid grid-cols-[240px_1fr] bg-bg-main"
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

    <aside class="h-full overflow-y-auto">
      <Sidebar />
    </aside>

    <div class="px-6 py-4 text-white space-y-6 w-4/5">
      <!-- PAGE TITLE -->
      <div>
        <h1 class="text-2xl font-bold">Cadastro de corridas</h1>
      </div>

      <!-- MAIN CARD -->
      <div class="w-full bg-bg-surface rounded-2xl p-6">
        <!-- TOP ACTION -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-semibold">Adicionar corrida</h2>
        </div>

        <!-- CONTENT GRID -->
        <div class="grid grid-cols-3 gap-6">
          <!-- LEFT COLUMN -->
          <div class="col-span-1 space-y-4">
            <div class="bg-bg-card p-4 rounded-xl border border-gray-700">
              <p class="text-sm text-gray-400">
                Use o botão abaixo para criar uma nova corrida, adicionar
                cavalos participantes, horário e status
              </p>

              <Button
                variant="secondary"
                class="mt-4 w-full bg-action-button hover:bg-blue-500 transition py-2 rounded-lg"
                @click="toggleForm"
              >
                Cadastrar corrida
              </Button>
            </div>
          </div>

          <!-- RIGHT COLUMN -->
          <div class="col-span-2">
            <div class="bg-bg-card rounded-xl border border-gray-700">
              <!-- TABLE HEADER -->
              <div class="px-4 py-3 border-b border-gray-700">
                <h3 class="font-semibold">Corridas cadastradas</h3>
              </div>

              <!-- LIST -->
              <div class="divide-y divide-gray-800">
                <div
                  v-for="race in races"
                  :key="race.id"
                  class="px-4 py-3 flex justify-between items-center hover:bg-[#1f2937] last:rounded-b-xl transition"
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
                    <Button
                      variant="secondary"
                      class="px-3 py-1 bg-action-button/60 hover:bg-action-button rounded-lg"
                      @click="adminRaces.updateStatus(race.id, 'open')"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="secondary"
                      class="px-3 py-1 bg-red-600/80 hover:bg-red-600 rounded-lg"
                      @click="removeRace(race.id)"
                    >
                      Apagar
                    </Button>
                  </div>
                </div>

                <div
                  v-if="!races.length"
                  class="px-4 py-6 text-center text-gray-400"
                >
                  Sem corridas cadastradas
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
