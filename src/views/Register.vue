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
    alert("Passwords do not match");
    return;
  }

  if (!acceptedTerms.value) {
    alert("You must accept the terms");
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
    class="min-h-screen w-full flex items-start justify-center bg-linear-to-br from-[#08162f] via-[#0b1f3f] to-[#020617] col-span-3"
  >
    <!-- MAIN CARD -->
    <div
      class="w-11/12 max-w-6xl h-10/12 grid grid-cols-5 my-10 rounded-2xl overflow-hidden shadow-2xl"
    >
      <!-- LEFT / PROMO -->
      <div
        class="col-span-3 relative bg-cover bg-center"
        style="background-image: url('/sports-bg.jpg')"
      >
        <div
          class="absolute inset-0 bg-linear-to-r from-blue-900/90 via-blue-800/80 to-transparent p-10 flex flex-col justify-center"
        >
          <span class="text-white font-bold text-xl mb-6">10 BET</span>

          <h1 class="text-4xl font-bold text-white leading-tight mb-4">
            All Sports.<br />
            One Betting Power.
          </h1>

          <p class="text-blue-100 max-w-sm">
            Fast, secure and real-time betting.
          </p>
        </div>
      </div>

      <!-- RIGHT / REGISTER -->
      <div class="col-span-2 bg-[#0b1220] p-10 flex flex-col justify-center">
        <!-- Header -->
        <div class="text-center mb-6">
          <h2 class="text-2xl font-semibold text-white">Create an Account</h2>
          <p class="text-sm text-gray-400 mt-1">
            Sign up now to start winning!
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleRegister" class="space-y-4">
          <input
            v-model="name"
            type="text"
            placeholder="Username"
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
            placeholder="Password"
            required
            class="w-full h-11 rounded-lg bg-[#111827] border border-gray-700 px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <!-- Password rules -->
          <ul class="text-sm space-y-1 mt-2">
            <li :class="rules.length ? 'text-green-400' : 'text-red-400'">
              At least 8 characters
            </li>
            <li :class="rules.uppercase ? 'text-green-400' : 'text-red-400'">
              1 uppercase letter (A-Z)
            </li>
            <li :class="rules.number ? 'text-green-400' : 'text-red-400'">
              1 number (0-9)
            </li>
            <li :class="rules.special ? 'text-green-400' : 'text-red-400'">
              1 special character (@$!%*?&)
            </li>
          </ul>

          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm Password"
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
            I accept the
            <a href="#" class="text-blue-400 hover:underline">
              Terms and Conditions
            </a>
          </label>

          <!-- Button -->
          <button
            type="submit"
            class="w-full h-11 bg-blue-600 hover:bg-blue-500 transition rounded-lg text-white font-semibold"
          >
            SIGN UP
          </button>
        </form>

        <!-- Divider -->
        <div class="flex items-center my-6">
          <div class="flex-1 h-px bg-gray-700"></div>
          <span class="px-3 text-sm text-gray-400">or sign up with</span>
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
          Already have an account?
          <RouterLink to="/login" class="text-blue-400 hover:underline">
            Login Here
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
