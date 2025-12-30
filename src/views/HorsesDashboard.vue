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
  if (confirm("Remover este cavalo?")) {
    horsesStore.removeHorse(id);
  }
}
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <header class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Dashboard • Cavalos</h1>
      <span class="text-sm text-gray-500">
        Total: {{ horsesStore.horses.length }}
      </span>
    </header>

    <!-- Form -->
    <section class="bg-white rounded-xl shadow p-6">
      <h2 class="font-semibold mb-4">Cadastrar Cavalo</h2>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input v-model="form.name" placeholder="Nome" class="input" />
        <input
          v-model.number="form.age"
          type="number"
          placeholder="Idade"
          class="input"
        />
        <input v-model="form.breed" placeholder="Raça" class="input" />
        <input
          v-model="form.trainer_name"
          placeholder="Treinador"
          class="input"
        />
      </div>

      <button
        @click="addHorse"
        class="mt-4 px-4 py-2 rounded-lg bg-black text-white hover:opacity-90"
      >
        Cadastrar
      </button>
    </section>

    <!-- Table -->
    <section class="bg-white rounded-xl shadow p-6 overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b text-sm text-gray-500">
            <th class="py-2">Nome</th>
            <th>Idade</th>
            <th>Raça</th>
            <th>Treinador</th>
            <th class="text-right">Ações</th>
          </tr>
        </thead>

        <tbody>
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
                class="text-red-600 hover:underline"
              >
                Remover
              </button>
            </td>
          </tr>

          <tr v-if="horsesStore.horses.length === 0">
            <td colspan="5" class="text-center py-6 text-gray-400">
              Nenhum cavalo cadastrado
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
