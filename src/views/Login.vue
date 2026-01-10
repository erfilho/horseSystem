<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";
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
    class="h-full flex justify-center items-center bg-linear-to-br from-df-bg to-content-bg col-span-3"
  >
    <div class="w-full max-w-md h-2/5 bg-content-bg rounded-2xl shadow-xl p-8">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-2xl font-bold text-white">Horse Racing</h1>
        <p class="text-sm text-gray-400 mt-1">Sign in to place your bets</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
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

        <button
          type="submit"
          class="w-full bg-action-button hover:bg-sky-400 hover:cursor-pointer transition text-white font-semibold py-2 rounded-lg"
          @click="handleLogin"
        >
          Log In
        </button>
      </form>

      <!-- Footer -->
      <div class="mt-6 text-center text-sm text-gray-400 space-y-2">
        <p>
          Don’t have an account?
          <RouterLink to="/register" class="text-blue-500 hover:underline">
            Join now
          </RouterLink>
        </p>
        <p>
          <a href="#" class="hover:underline"> Forgot your password? </a>
        </p>
      </div>
    </div>
  </div>
</template>
