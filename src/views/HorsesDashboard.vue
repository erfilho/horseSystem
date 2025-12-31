<script setup lang="ts">
import { useHorsesStore } from "@/stores/horses.store";
import type { Horse } from "@/types/Horse";
import { ref } from "vue";

const horsesStore = useHorsesStore();

const form = ref<Omit<Horse, "id">>({
  name: "",
  age: 0,
  breed: "",
  trainer_name: "",
});

function addHorse() {
  if (!form.value.name) return;

  horsesStore.addHorse({
    id: crypto.randomUUID(),
    ...form.value,
  });

  // reset
  form.value = {
    name: "",
    age: 0,
    breed: "",
    trainer_name: "",
  };
}

function removeHorse(id: string) {
  if (confirm("Delete this horse?")) {
    horsesStore.removeHorse(id);
  }
}
</script>

<template>
  <div class="p-6 space-y-8 flex flex-col justify-center items-center">
    <!-- Header -->
    <header class="flex justify-between items-center text-white">
      <h1 class="text-2xl font-bold">Dashboard • Horses</h1>
    </header>

    <!-- Form -->
    <section class="bg-content-bg rounded-xl shadow p-6 w-2/5 text-white">
      <h2 class="font-semibold mb-4">Horse register</h2>

      <div class="flex flex-col gap-2">
        <div class="w-full flex flex-row gap-2">
          <div class="flex flex-col w-1/2">
            <label for="name" class="text-sm"> Horse name </label>
            <input
              v-model="form.name"
              id="name"
              class="w-5/6 rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>

          <div class="flex flex-col w-1/2">
            <label for="name" class="text-sm"> Horse breed </label>
            <input
              v-model="form.breed"
              class="w-5/6 rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>
        </div>

        <div class="w-full flex flex-row gap-2">
          <div class="flex flex-col w-full">
            <label for="age" class="text-sm"> Horse age </label>
            <input
              v-model.number="form.age"
              type="number"
              id="age"
              placeholder="Age"
              class="w-5/6 rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>

          <div class="flex flex-col w-full">
            <label for="name" class="text-sm"> Horse trainer </label>
            <input
              v-model="form.trainer_name"
              placeholder="Trainer name"
              class="w-5/6 rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>
        </div>
      </div>

      <button
        @click="addHorse"
        class="bg-green-600 hover:bg-green-500 cursor-pointer transition text-white font-semibold px-6 py-2 rounded-lg mt-3"
      >
        Add horse
      </button>
    </section>

    <!-- Table -->
    <section class="bg-content-bg rounded-xl shadow p-6 overflow-x-auto w-2/5">
      <span class="text-sm text-gray-500">
        Total: {{ horsesStore.horses.length }}
      </span>
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b text-sm text-gray-500">
            <th class="py-2">Name</th>
            <th>Age</th>
            <th>Breed</th>
            <th>Trainer</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>

        <tbody class="text-white">
          <tr
            v-for="horse in horsesStore.horses"
            :key="horse.id"
            class="border-b last:border-none"
          >
            <td class="py-2 font-medium">{{ horse.name }}</td>
            <td>{{ horse.age }}</td>
            <td>{{ horse.breed }}</td>
            <td>{{ horse.trainer_name }}</td>
            <td class="text-right">
              <button
                @click="removeHorse(horse.id)"
                class="text-red-600 hover:underline cursor-pointer"
              >
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="horsesStore.horses.length === 0">
            <td colspan="5" class="text-center py-6 text-gray-400">
              No horses registered!
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
