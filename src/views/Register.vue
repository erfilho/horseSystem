<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

function handleRegister() {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }

  // Placeholder — backend entra depois
  console.log("Register:", {
    name: name.value,
    email: email.value,
    password: password.value,
  });
}
</script>

<template>
  <div
    class="h-full flex items-center justify-center bg-linear-to-br from-df-bg to-content-bg col-span-3"
  >
    <div class="w-full max-w-md bg-content-bg rounded-2xl shadow-xl p-8">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-2xl font-bold text-white">Join Horse Racing</h1>
        <p class="text-sm text-gray-400 mt-1">
          Create your account and start betting
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleRegister" class="space-y-5">
        <div>
          <label class="block text-sm text-gray-400 mb-1"> Name </label>
          <input
            v-model="name"
            type="text"
            required
            placeholder="Your name"
            class="w-full rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-1"> Email </label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="you@email.com"
            class="w-full rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-1"> Password </label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-1">
            Confirm Password
          </label>
          <input
            v-model="confirmPassword"
            type="password"
            required
            placeholder="••••••••"
            class="w-full rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-action-button hover:bg-sky-400 hover:cursor-pointer transition text-white font-semibold py-2 rounded-lg"
        >
          Create account
        </button>
      </form>

      <!-- Footer -->
      <div class="mt-6 text-center text-sm text-gray-400">
        <p>
          Already have an account?
          <RouterLink to="/login" class="text-blue-500 hover:underline">
            Log in
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
