<script setup lang="ts">
import { AkGoogleContainedFill, AnFilledApple } from "@kalimahapps/vue-icons";
import { computed, ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const acceptedTerms = ref(false);

const rules = computed(() => ({
  length: password.value.length >= 8,
  uppercase: /[A-Z]/.test(password.value),
  number: /\d/.test(password.value),
  special: /[@$!%*?&]/.test(password.value),
}));

function handleRegister() {
  if (password.value !== confirmPassword.value) {
    alert("Senhas não são iguais");
    return;
  }

  if (!acceptedTerms.value) {
    alert("Você precisa aceitar os termos!");
    return;
  }

  console.log("Register:", {
    name: name.value,
    email: email.value,
    password: password.value,
  });
}
</script>

<template>
  <div
    class="min-h-screen w-full flex items-center justify-center bg-bg-main col-span-3"
  >
    <!-- RIGHT / REGISTER -->
    <div
      class="rounded-2xl w-1/5 bg-bg-surface p-10 flex flex-col justify-center shadow-2xl"
    >
      <!-- Header -->
      <div class="text-center mb-6">
        <h2 class="text-2xl font-semibold text-white">Crie sua conta</h2>
        <p class="text-sm text-gray-400 mt-1">Cadastre-se e comece a vencer!</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleRegister" class="space-y-4">
        <input
          v-model="name"
          type="text"
          placeholder="Usuário"
          required
          class="w-full h-11 rounded-lg bg-[#111827] border border-gray-700 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="w-full h-11 rounded-lg bg-[#111827] border border-gray-700 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Senha"
          required
          class="w-full h-11 rounded-lg bg-[#111827] border border-gray-700 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <!-- Password rules -->
        <ul class="text-sm space-y-1 mt-2">
          <li :class="rules.length ? 'text-green-400' : 'text-red-400'">
            Mais de 8 caracteres
          </li>
          <li :class="rules.uppercase ? 'text-green-400' : 'text-red-400'">
            1 letra maiúscula (A-Z)
          </li>
          <li :class="rules.number ? 'text-green-400' : 'text-red-400'">
            1 número (0-9)
          </li>
          <li :class="rules.special ? 'text-green-400' : 'text-red-400'">
            1 caractere especial (@$!%*?&)
          </li>
        </ul>

        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirme a senha"
          required
          class="w-full h-11 rounded-lg bg-[#111827] border border-gray-700 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <!-- Terms -->
        <label class="flex items-center gap-2 text-sm text-gray-400">
          <input
            type="checkbox"
            v-model="acceptedTerms"
            class="accent-blue-500"
          />
          Eu aceito os
          <a href="#" class="text-blue-400 hover:underline">
            Termos e condições
          </a>
        </label>

        <!-- Button -->
        <button
          type="submit"
          class="w-full h-11 bg-blue-600 hover:bg-blue-500 transition rounded-lg text-white font-semibold"
        >
          CADASTRE-SE
        </button>
      </form>

      <!-- Divider -->
      <div class="flex items-center my-6">
        <div class="flex-1 h-px bg-gray-700"></div>
        <span class="px-3 text-sm text-gray-400">ou cadastre-se com</span>
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
        Você já tem uma conta?
        <RouterLink to="/login" class="text-blue-400 hover:underline">
          Faça o login aqui
        </RouterLink>
      </p>
    </div>
  </div>
</template>
