<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { useHorsesStore } from "@/stores/horses.store";
import type { Horse } from "@/types/Horse";
import { ref } from "vue";

const horsesStore = useHorsesStore();

const editingHorseId = ref<string | null>(null);

const form = ref<Omit<Horse, "id">>({
  name: "",
  age: 0,
  breed: "",
  trainer_name: "",
});

function resetForm() {
  form.value = {
    name: "",
    age: 0,
    breed: "",
    trainer_name: "",
  };
  editingHorseId.value = null;
}

function removeHorse(id: string) {
  if (confirm("Delete this horse?")) {
    horsesStore.removeHorse(id);
  }
}

function saveHorse() {
  if (!form.value.name) return;

  if (editingHorseId.value) {
    horsesStore.updateHorse(editingHorseId.value, form.value);
  } else {
    horsesStore.addHorse({
      id: crypto.randomUUID(),
      ...form.value,
    });
  }

  resetForm();
}

function editHorse(horse: Horse) {
  editingHorseId.value = horse.id;
  form.value = {
    name: horse.name,
    age: horse.age,
    breed: horse.breed,
    trainer_name: horse.trainer_name,
  };
}
</script>

<template>
  <div
    class="min-h-screen w-full text-white grid grid-cols-[240px_1fr] bg-bg-main"
  >
    <aside class="h-full overflow-y-auto">
      <Sidebar />
    </aside>

    <div class="px-6 py-4 text-white space-y-6 w-4/5">
      <!-- PAGE TITLE -->
      <div>
        <h1 class="text-2xl font-bold">Cadastro de cavalos</h1>
      </div>

      <!-- MAIN GRID -->
      <div class="grid grid-cols-3 gap-6">
        <!-- LEFT: FORM -->
        <div
          class="col-span-1 bg-bg-surface rounded-xl p-5 border border-gray-700 space-y-4"
        >
          <h2 class="font-semibold">Add New Horse</h2>

          <input
            v-model="form.name"
            placeholder="Horse Name"
            class="w-full rounded-lg bg-df-bg border border-gray-700 px-4 py-2"
          />

          <input
            v-model.number="form.age"
            type="number"
            placeholder="Age"
            class="w-full rounded-lg bg-df-bg border border-gray-700 px-4 py-2"
          />

          <input
            v-model="form.breed"
            placeholder="Breed"
            class="w-full rounded-lg bg-df-bg border border-gray-700 px-4 py-2"
          />

          <input
            v-model="form.trainer_name"
            placeholder="Trainer"
            class="w-full rounded-lg bg-df-bg border border-gray-700 px-4 py-2"
          />

          <button
            @click="saveHorse"
            class="w-full bg-blue-600 hover:bg-blue-500 transition py-2 rounded-lg font-semibold"
          >
            {{ editingHorseId ? "Update Horse" : "Register Horse" }}
          </button>
        </div>

        <!-- RIGHT: TABLE -->
        <div
          class="col-span-2 bg-bg-surface rounded-xl p-5 border border-gray-700"
        >
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold">Registered Horses</h2>

            <input
              type="text"
              placeholder="Search horse..."
              class="bg-df-bg border border-gray-700 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <table class="w-full text-sm">
            <thead class="text-gray-400 border-b border-gray-700">
              <tr>
                <th class="w-16">#</th>
                <th class="w-32 text-left">Horse Name</th>
                <th class="w-20 text-center">Age</th>
                <th class="w-32 text-left">Breed</th>
                <th class="w-40 text-left">Trainer</th>
                <th class="w-32 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(horse, index) in horsesStore.horses"
                :key="horse.id"
                class="border-b border-gray-800 hover:bg-[#1f2937] transition"
              >
                <td class="w-16 text-center">{{ index + 1 }}</td>
                <td class="w-32">{{ horse.name }}</td>
                <td class="w-20 text-center">{{ horse.age }}</td>
                <td class="w-32">{{ horse.breed }}</td>
                <td class="w-40">{{ horse.trainer_name }}</td>

                <td class="w-32">
                  <div class="flex flex-row justify-end gap-2 w-full py-1">
                    <button
                      @click="editHorse(horse)"
                      class="p-1 rounded-lg bg-gray-700 hover:bg-gray-600"
                      title="Edit horse"
                    >
                      ✎
                    </button>
                    <button
                      @click="removeHorse(horse.id)"
                      class="p-1 rounded-lg bg-red-600 hover:bg-red-500"
                    >
                      🗑
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="horsesStore.horses.length === 0">
                <td colspan="6" class="text-center py-6 text-gray-400">
                  No horses registered
                </td>
              </tr>
            </tbody>
          </table>

          <!-- FOOTER -->
          <div
            class="flex justify-between items-center text-sm text-gray-500 pt-4"
          >
            <span>
              Showing 1 to {{ horsesStore.horses.length }} of
              {{ horsesStore.horses.length }} entries
            </span>

            <div class="flex gap-2">
              <button class="px-3 py-1 bg-gray-700 rounded">Prev</button>
              <button class="px-3 py-1 bg-gray-700 rounded">1</button>
              <button class="px-3 py-1 bg-gray-700 rounded">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
