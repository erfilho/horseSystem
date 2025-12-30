<script setup lang="ts">
import { useWalletStore } from "@/stores/wallet.store";
import { ref } from "vue";

import WalletTransaction from "@/components/WalletTransaction.vue";

const wallet = useWalletStore();
const amount = ref(10);

const handleCredit = (value: number) => {
  wallet.credit(value);
};

const handleDebit = (value: number) => {
  wallet.debit(value);
};
</script>

<template>
  <div class="p-6 text-white space-y-6 w-full h-screen flex justify-center">
    <div class="w-1/4 flex flex-col gap-2 items-center">
      <h1 class="text-2xl font-bold w-full">Wallet</h1>

      <!-- CURRENT AMOUNT -->
      <div class="bg-content-bg p-6 rounded-xl text-center w-11/12">
        <p class="text-zinc-400">Current balance</p>
        <p class="text-4xl font-bold mt-2">€ {{ wallet.balance.toFixed(2) }}</p>
      </div>

      <!-- ACTIONS BUTTONS -->
      <div class="flex gap-3 items-center justify-center">
        <input
          v-model.number="amount"
          type="number"
          class="bg-zinc-800 p-2 rounded w-32"
        />

        <button
          class="bg-green-600 px-4 py-2 rounded"
          @click="handleCredit(amount)"
        >
          Deposit
        </button>

        <button
          class="bg-red-600 px-4 py-2 rounded"
          @click="handleDebit(amount)"
        >
          Withdraw
        </button>
      </div>

      <h1 class="text-2xl font-bold w-full">Recent transactions</h1>

      <WalletTransaction
        v-for="transaction in wallet.transactions"
        :id="transaction.id"
        :type="transaction.type"
        :amount="transaction.amount"
        :created-at="transaction.createdAt"
      />
    </div>
  </div>
</template>
