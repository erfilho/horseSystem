<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";
import { AkGoogleContainedFill, AnFilledApple } from "@kalimahapps/vue-icons";
import { ref } from "vue";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");

function handleLogin() {
  auth.login(email.value, password.value);
  router.push("/");
}
</script>

<template>
  <div
    class="min-h-screen w-full flex items-center justify-center bg-bg-main col-span-3"
  >
    <!-- Container -->
    <div class="w-2/12 max-w-6xl h-3/4 rounded-2xl overflow-hidden shadow-2xl">
      <!-- RIGHT SIDE / LOGIN -->
      <div class="h-full bg-bg-surface p-10 flex flex-col justify-center">
        <!-- Header -->
        <div class="text-center mb-8">
          <h2 class="text-2xl font-semibold text-white">Bem-vindo</h2>
          <p class=" text-gray-400 mt-1">
            Acesse para começar a apostar
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email -->
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            class="w-full h-11 rounded-lg bg-bg-card border border-gray-700 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <!-- Password -->
          <input
            v-model="password"
            type="password"
            placeholder="Senha"
            required
            class="w-full h-11 rounded-lg bg-bg-card border border-gray-700 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <!-- Forgot -->
          <div class="text-right text-sm">
            <a href="#" class="text-blue-400 hover:underline">
              Esqueceu a senha?
            </a>
          </div>

          <!-- Button -->
          <button
            type="submit"
            class="w-full h-11 bg-blue-600 hover:bg-blue-500 transition rounded-lg text-white font-semibold"
          >
            LOG IN
          </button>
        </form>

        <!-- Divider -->
        <div class="flex items-center my-6">
          <div class="flex-1 h-px bg-gray-700"></div>
          <span class="px-3 text-sm text-gray-400">ou</span>
          <div class="flex-1 h-px bg-gray-700"></div>
        </div>

        <!-- Social -->
        <div class="grid grid-cols-2 gap-4">
          <button
            class="h-11 border border-gray-700 rounded-lg flex items-center justify-center gap-2 text-gray-300 hover:bg-gray-800 transition"
          >
            <span class="text-lg"><AkGoogleContainedFill /></span> Google
          </button>

          <button
            class="h-11 border border-gray-700 rounded-lg flex items-center justify-center gap-2 text-gray-300 hover:bg-gray-800 transition"
          >
            <span class="text-lg"><AnFilledApple /></span> Apple
          </button>
        </div>

        <!-- Footer -->
        <p class="text-center text-sm text-gray-400 mt-6">
          Não tem conta?
          <RouterLink to="/register" class="text-blue-400 hover:underline">
            Cadastre-se
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
