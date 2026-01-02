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
  <div
    class="flex flex-col gap-2 w-full items-center justify-center text-white"
  >
    <div class="flex flex-col w-full">
      <label for="raceName" class="text-sm"> Race name </label>
      <input
        v-model="form.name"
        id="raceName"
        class="w-5/6 rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-1 focus:ring-green-500 outline-none"
      />
    </div>

    <!-- Race times -->
    <div class="flex flex-row w-full justify-between">
      <div class="w-1/2 flex flex-col">
        <label for="startTime" class="text-sm"> Race start time </label>
        <input
          id="startTime"
          v-model="form.startTime"
          class="w-5/6 rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-1 focus:ring-green-500 outline-none"
        />
      </div>

      <div class="w-1/2 flex flex-col">
        <label for="endTime" class="text-sm"> Race end time </label>
        <input
          v-model="form.finishTime"
          id="endTime"
          class="w-5/6 rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-1 focus:ring-green-500 outline-none"
        />
      </div>
    </div>

    <!-- Race status -->
    <div class="flex flex-col w-1/3">
      <label for="raceStatus" class="text-sm"> Race status </label>
      <select
        name="raceStatus"
        v-model="form.status"
        class="w-5/6 rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white focus:ring-1 focus:ring-green-500 outline-none"
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

    <!-- Horses table -->
    <div class="flex flex-col gap-2 mt-4">
      <h3 class="font-semibold">Select horses</h3>

      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b text-sm text-gray-500">
            <th></th>
            <th>Name</th>
            <th>Age</th>
            <th>Breed</th>
            <th>Trainer</th>
            <th>Odd</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="horse in horses"
            :key="horse.id"
            class="border-b last:border-none"
          >
            <td class="py-2 text-center">
              <input
                type="checkbox"
                :checked="isSelected(horse.id)"
                @change="toggleHorse(horse.id)"
                class="accent-green-500"
              />
            </td>
            <td>{{ horse.name }}</td>
            <td>{{ horse.age }}</td>
            <td>{{ horse.breed }}</td>
            <td>{{ horse.trainer_name }}</td>
            <td class="py-2 text-center">
              <input
                type="number"
                min="1"
                step="0.01"
                class="w-20 rounded bg-df-bg border border-gray-700 px-2 py-1"
                :disabled="!isSelected(horse.id)"
                :value="getOdd(horse.id)"
                @input="
                  updateOdd(horse.id, ($event.target as HTMLInputElement).value)
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

    <div class="flex justify-end gap-2 pt-4">
      <button
        class="px-4 py-2 rounded-lg border border-gray-600 cursor-pointer"
        @click="$emit('cancel')"
      >
        Cancel
      </button>

      <button
        class="bg-action-button px-4 py-2 rounded-lg cursor-pointer"
        @click="$emit('submit')"
      >
        Save race
      </button>
    </div>
  </div>
</template>
