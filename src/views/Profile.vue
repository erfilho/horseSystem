<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { ref } from "vue";

type Tab = "perfil" | "endereço" | "preferências" | "conta";

const tabs: Tab[] = ["perfil", "endereço", "preferências", "conta"];

const activeTab = ref("perfil");

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const birthDate = ref("");
const phone = ref("");

function saveProfile() {
  console.log("Profile saved", {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    birthDate: birthDate.value,
    phone: phone.value,
  });
}
</script>

<template>
  <div
    class="min-h-screen w-full text-white grid grid-cols-[240px_1fr] bg-bg-main"
  >
    <aside class="h-full overflow-y-auto">
      <Sidebar />
    </aside>

    <div class="max-w-7xl w-6xl mx-auto py-4">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-white">Configurações do perfil</h1>
        <p class="text-gray-400">
          Edite suas informações pessoais e suas preferências
        </p>
      </div>

      <div class="bg-bg-surface backdrop-blur rounded-2xl shadow-xl p-6">
        <!-- Tabs -->
        <div class="flex gap-6 border-b border-gray-700 mb-8">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'pb-3 font-medium transition capitalize',
              activeTab === tab
                ? 'text-green-400 border-b-2 border-green-400'
                : 'text-gray-400 hover:text-white',
            ]"
          >
            {{ tab }}
          </button>
        </div>

        <!-- Profile Form -->
        <div
          v-if="activeTab === 'perfil'"
          class="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label class="block text-sm text-gray-400 mb-1"> Nome </label>
            <input
              v-model="firstName"
              type="text"
              placeholder="Nome"
              class="w-full rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-1"> Sobrenome </label>
            <input
              v-model="lastName"
              type="text"
              placeholder="Sobrenome"
              class="w-full rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-1"> Email </label>
            <input
              v-model="email"
              type="email"
              placeholder="Coloque um email válido"
              class="w-full rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-1">
              Data de nascimento
            </label>
            <input
              v-model="birthDate"
              type="date"
              class="w-full rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-1"> Celular </label>
            <input
              v-model="phone"
              type="tel"
              placeholder="+55 (XX) X XXXX-XXXX"
              class="w-full rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        </div>

        <!-- Address form -->
        <div
          v-if="activeTab === 'endereço'"
          class="flex flex-col md:grid-cols-2 gap-6"
        >
          <div class="flex flex-row gap-2">
            <div>
              <label class="block text-sm text-gray-400 mb-1">Estado</label>
              <input
                placeholder="Ceará"
                class="input rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label class="block text-sm text-gray-400 mb-1">Cidade</label>
              <input
                class="input rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Fortaleza"
              />
            </div>
          </div>

          <div class="flex flex-col w-2/5">
            <label class="block text-sm text-gray-400 mb-1">Endereço</label>
            <input
              class="input rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Logradouro"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-1">CEP</label>
            <input
              class="input rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="0000-000"
            />
          </div>
        </div>

        <!-- Preferences form -->
        <div v-if="activeTab === 'preferências'" class="space-y-6">
          <div class="flex items-center justify-start gap-2">
            <span class="text-white">Notificações no email</span>
            <input type="checkbox" class="toggle" />
          </div>

          <div class="flex items-center justify-start gap-2">
            <span class="text-white">Notificações SMS</span>
            <input type="checkbox" class="toggle" />
          </div>

          <div class="flex items-center">
            <label class="label text-white">Formato odds </label>
            <select class="input text-white bg-">
              <option>Decimal</option>
              <option>Fracionado</option>
            </select>
          </div>
        </div>

        <!-- Account form -->
        <div v-if="activeTab === 'conta'" class="space-y-6">
          <div>
            <label class="block text-sm text-gray-400 mb-1"
              >Redefinir senha</label
            >
            <input
              type="password"
              class="input rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Senha atual"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-1"> Nova senha </label>
            <input
              type="password"
              class="input rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Nova senha"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-1">
              Confirmar nova senha
            </label>
            <input
              type="password"
              class="input rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Confirmar nova senha"
            />
          </div>

          <button
            class="text-white hover:bg-red-500 rounded-lg border-red-500 bg-red-700 h-10 px-2"
          >
            Apagar conta
          </button>
        </div>

        <!-- Actions -->
        <div class="mt-8 flex justify-end">
          <button
            @click="saveProfile"
            class="bg-green-600 hover:bg-green-500 hover:cursor-pointer transition text-white font-semibold px-6 py-2 rounded-lg"
          >
            Salvar alterações
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
