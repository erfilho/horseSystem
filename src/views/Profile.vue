<script setup lang="ts">
import { ref } from "vue";

type Tab = "profile" | "address" | "preferences" | "account";

const tabs: Tab[] = ["profile", "address", "preferences", "account"];

const activeTab = ref("profile");

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
    class="min-h-screen bg-linear-to-br from-df-bg to-content-bg p-6 col-span-3"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-white">Account Settings</h1>
        <p class="text-sm text-gray-400">
          Manage your personal information and preferences
        </p>
      </div>

      <div class="bg-content-bg rounded-2xl shadow-xl p-6">
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
          v-if="activeTab === 'profile'"
          class="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label class="block text-sm text-gray-400 mb-1"> First name </label>
            <input
              v-model="firstName"
              type="text"
              placeholder="First name (as on ID)"
              class="w-full rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-1"> Last name </label>
            <input
              v-model="lastName"
              type="text"
              placeholder="Last name (as on ID)"
              class="w-full rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-1"> Email </label>
            <input
              v-model="email"
              type="email"
              placeholder="Enter a valid email address"
              class="w-full rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-1">
              Date of birth
            </label>
            <input
              v-model="birthDate"
              type="date"
              class="w-full rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-1">
              Phone number
            </label>
            <input
              v-model="phone"
              type="tel"
              placeholder="+44 XXXXXXXX"
              class="w-full rounded-lg bg-df-bg border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        </div>

        <!-- Address form -->
        <div
          v-if="activeTab === 'address'"
          class="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label class="block text-sm text-gray-400 mb-1">Country</label>
            <input class="input" placeholder="United Kingdom" />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-1">City</label>
            <input class="input" placeholder="London" />
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm text-gray-400 mb-1">Address</label>
            <input class="input" placeholder="Street and number" />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-1">Postal code</label>
            <input class="input" placeholder="SW1A 1AA" />
          </div>
        </div>

        <!-- Preferences form -->
        <div v-if="activeTab === 'preferences'" class="space-y-6">
          <div class="flex items-center justify-between">
            <span class="text-white">Email notifications</span>
            <input type="checkbox" class="accent-green-500" />
          </div>

          <div class="flex items-center justify-between">
            <span class="text-white">SMS notifications</span>
            <input type="checkbox" class="accent-green-500" />
          </div>

          <div class="flex items-center justify-between">
            <span class="text-white">Odds format</span>
            <select class="input">
              <option>Decimal</option>
              <option>Fractional</option>
              <option>American</option>
            </select>
          </div>
        </div>

        <!-- Account form -->
        <div v-if="activeTab === 'account'" class="space-y-6">
          <div>
            <label class="block text-sm text-gray-400 mb-1"
              >Change password</label
            >
            <input type="password" class="input" placeholder="New password" />
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              class="input"
              placeholder="Confirm password"
            />
          </div>

          <button class="text-red-400 hover:text-red-300">
            Deactivate account
          </button>
        </div>

        <!-- Actions -->
        <div class="mt-8 flex justify-end">
          <button
            @click="saveProfile"
            class="bg-green-600 hover:bg-green-500 hover:cursor-pointer transition text-white font-semibold px-6 py-2 rounded-lg"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
