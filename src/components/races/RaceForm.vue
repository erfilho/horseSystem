<!-- RaceForm.vue - Corrigido -->
<script setup lang="ts">
import type { Horse } from "@/types/Horse";
import type { RaceStatus } from "@/types/RaceStatus";
import { computed } from "vue";

type RaceHorseForm = {
  horseId: string;
  odd: number;
};

export type RaceFormModel = {
  name: string;
  startTime: string;
  finishTime: string;
  status: RaceStatus;
  horseIds: RaceHorseForm[];
};

const props = defineProps<{
  modelValue: RaceFormModel;
  horses: Horse[];
  statusOptions: { label: string; status: RaceStatus }[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: RaceFormModel): void;
  (e: "submit"): void;
  (e: "cancel"): void;
}>();

const form = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

function isSelected(horseId: string) {
  return form.value.horseIds.some((h) => h.horseId === horseId);
}

function toggleHorse(horseId: string) {
  const index = form.value.horseIds.findIndex((h) => h.horseId === horseId);

  if (index >= 0) {
    // Remove horse
    form.value.horseIds.splice(index, 1);
  } else {
    // Add horse with default odd
    form.value.horseIds.push({ horseId, odd: 1.5 });
  }

  emit("update:modelValue", form.value);
}

function getOdd(horseId: string) {
  return form.value.horseIds.find((h) => h.horseId === horseId)?.odd ?? 1.5;
}

function updateOdd(horseId: string, value: string) {
  const horse = form.value.horseIds.find((h) => h.horseId === horseId);
  if (horse) {
    horse.odd = Number(value);
    emit("update:modelValue", form.value);
  }
}
</script>

<template>
  <div class="w-full max-w-5xl text-white">
    <!-- HEADER -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold">Add New Race</h2>
      <p class="text-sm text-gray-400">
        Configure race details and assign participating horses.
      </p>
    </div>

    <!-- MAIN GRID -->
    <div class="grid grid-cols-3 gap-6">
      <!-- LEFT COLUMN: RACE DETAILS -->
      <div
        class="col-span-1 bg-[#0f172a] border border-gray-700 rounded-xl p-4 space-y-4"
      >
        <h3 class="font-semibold text-sm text-gray-300">Race Details</h3>

        <!-- Race name -->
        <div class="flex flex-col">
          <label class="text-xs text-gray-400 mb-1">Race name</label>
          <input
            v-model="form.name"
            class="rounded-lg bg-df-bg border border-gray-700 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
          />
        </div>

        <!-- Times -->
        <div class="flex gap-3">
          <div class="flex-1">
            <label class="text-xs text-gray-400 mb-1 block">Start time</label>
            <input
              v-model="form.startTime"
              class="w-full rounded-lg bg-df-bg border border-gray-700 px-3 py-2 text-sm"
            />
          </div>

          <div class="flex-1">
            <label class="text-xs text-gray-400 mb-1 block">Finish time</label>
            <input
              v-model="form.finishTime"
              class="w-full rounded-lg bg-df-bg border border-gray-700 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <!-- Status -->
        <div>
          <label class="text-xs text-gray-400 mb-1 block">Race status</label>
          <select
            v-model="form.status"
            class="w-full rounded-lg bg-df-bg border border-gray-700 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
          >
            <option
              v-for="option in statusOptions"
              :key="option.status"
              :value="option.status"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <!-- RIGHT COLUMN: HORSES -->
      <div class="col-span-2 bg-[#0f172a] border border-gray-700 rounded-xl">
        <div class="px-4 py-3 border-b border-gray-700">
          <h3 class="font-semibold text-sm">Registered Horses</h3>
        </div>

        <div class="max-h-[360px] overflow-auto">
          <table class="w-full text-sm">
            <thead class="sticky top-0 bg-[#0f172a]">
              <tr class="text-gray-400 border-b border-gray-700">
                <th class="p-2 text-center"></th>
                <th class="p-2 text-left">Name</th>
                <th class="p-2">Age</th>
                <th class="p-2">Breed</th>
                <th class="p-2">Trainer</th>
                <th class="p-2 text-center">Odd</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="horse in horses"
                :key="horse.id"
                class="border-b border-gray-800 hover:bg-[#1f2937] transition"
              >
                <td class="p-2 text-center">
                  <input
                    type="checkbox"
                    class="accent-blue-500"
                    :checked="isSelected(horse.id)"
                    @change="toggleHorse(horse.id)"
                  />
                </td>
                <td class="p-2">{{ horse.name }}</td>
                <td class="p-2">{{ horse.age }}</td>
                <td class="p-2">{{ horse.breed }}</td>
                <td class="p-2">{{ horse.trainer_name }}</td>
                <td class="p-2 text-center">
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    class="w-20 rounded bg-df-bg border border-gray-700 px-2 py-1 text-center"
                    :disabled="!isSelected(horse.id)"
                    :value="getOdd(horse.id)"
                    @input="
                      updateOdd(
                        horse.id,
                        ($event.target as HTMLInputElement).value
                      )
                    "
                  />
                </td>
              </tr>

              <tr v-if="horses.length === 0">
                <td colspan="6" class="text-center py-6 text-gray-400">
                  No horses registered
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- FOOTER ACTIONS -->
    <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-700">
      <button
        class="px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition"
        @click="$emit('cancel')"
      >
        Cancel
      </button>

      <button
        class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition"
        @click="$emit('submit')"
      >
        Save race
      </button>
    </div>
  </div>
</template>
