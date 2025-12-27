<script setup lang="ts">
import { useUserBetsStore } from "@/stores/userBets.store";
import { computed } from "vue";

const history = useUserBetsStore();
const bets = computed(() => history.bets);
</script>

<template>
  <div class="p-6 text-white space-y-6">
    <h1 class="text-2xl font-bold">Bet History</h1>

    <div v-if="bets.length === 0" class="text-zinc-400">
      No bets placed yet.
    </div>

    <div class="space-y-3">
      <div
        v-for="bet in bets"
        :key="bet.id"
        class="bg-content-bg p-4 rounded-lg"
      >
        <div class="flex justify-between">
          <p class="font-semibold">
            {{ bet.createdAt }}
          </p>
          <span
            class="px-2 py-1 rounded text-xs"
            :class="{
              'bg-yellow-600': bet.status === 'open',
              'bg-green-600': bet.status === 'won',
              'bg-red-600': bet.status === 'lost',
            }"
          >
            {{ bet.status }}
          </span>
        </div>

        <div class="text-sm text-zinc-400 mt-2">
          Stake: € {{ bet.stake }} · Odds: {{ bet.totalOdds }}
        </div>

        <div class="font-bold mt-1">Return: € {{ bet.potentialReturn }}</div>
      </div>
    </div>
  </div>
</template>
