<script setup lang="ts">
import { useWalletStore } from "@/stores/wallet.store";
import { ref } from "vue";

const wallet = useWalletStore();
const amount = ref(10);
</script>

<template>
  <div class="p-6 text-white space-y-6">
    <h1 class="text-2xl font-bold">Wallet</h1>

    <div class="bg-content-bg p-6 rounded-xl text-center">
      <p class="text-zinc-400">Current balance</p>
      <p class="text-4xl font-bold mt-2">€ {{ wallet.balance.toFixed(2) }}</p>
    </div>

    <div class="flex gap-3">
      <input
        v-model.number="amount"
        type="number"
        class="bg-zinc-800 p-2 rounded w-32"
      />

      <button
        class="bg-green-600 px-4 py-2 rounded"
        @click="wallet.credit(amount)"
      >
        Deposit
      </button>

      <button
        class="bg-red-600 px-4 py-2 rounded"
        @click="wallet.debit(amount)"
      >
        Withdraw
      </button>
    </div>
  </div>
</template>
