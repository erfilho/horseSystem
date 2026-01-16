<script setup lang="ts">
import WalletTransaction from "@/components/WalletTransaction.vue";
import { useWalletStore, type PaymentMethod } from "@/stores/wallet.store";
import { BsBank } from "@kalimahapps/vue-icons";
import { ref } from "vue";

const wallet = useWalletStore();
const depositAmount = ref<number | null>(null);
const withdrawAmount = ref<number | null>(null);

const method = ref<PaymentMethod | null>(null);

const handleCredit = () => {
  if (!depositAmount.value) return;
  if (!method.value) return; // garante que escolheu um método

  wallet.credit(depositAmount.value, method.value);
  depositAmount.value = null;
  method.value = null;
};

const handleDebit = () => {
  if (!withdrawAmount.value) return;
  wallet.debit(withdrawAmount.value);
  withdrawAmount.value = null;
};
</script>

<template>
  <div
    class="min-h-screen w-full bg-linear-to-br from-[#08162f] via-[#0b1f3f] to-[#020617] text-white col-span-3"
  >
    <!-- CONTENT -->
    <div class="max-w-7xl mx-auto px-10 py-10 space-y-10">
      <!-- TABS -->
      <div class="flex gap-6 border-b border-white/10">
        <button
          class="pb-3 text-blue-400 border-b-2 border-blue-400 font-semibold"
        >
          Balance Overview
        </button>
      </div>

      <!-- MAIN GRID -->
      <div class="grid grid-cols-12 gap-6">
        <!-- BALANCE OVERVIEW -->
        <div
          class="col-span-4 bg-[#0b1220]/90 backdrop-blur rounded-2xl p-6 border border-white/10"
        >
          <h2 class="text-sm text-zinc-400 mb-4">Balance Overview</h2>

          <div class="bg-black/30 rounded-xl p-6">
            <p class="text-xs text-zinc-400">Wallet Balance</p>
            <p class="text-4xl font-bold mt-2">
              € {{ wallet.balance.toFixed(2) }}
            </p>
          </div>

          <div class="mt-6 space-y-3 text-sm">
            <div class="flex justify-between text-zinc-300">
              <span>Bonuses</span>
              <span class="text-blue-400">€ 0.00</span>
            </div>
            <div class="flex justify-between">
              <span>Cash</span>
              <span>€ {{ wallet.balance.toFixed(2) }}</span>
            </div>
          </div>

          <button
            class="w-full mt-6 bg-blue-600 hover:bg-blue-500 transition rounded-lg py-3 font-semibold"
          >
            Withdraw
          </button>
        </div>

        <!-- DEPOSIT -->
        <div
          class="col-span-4 bg-[#0b1220]/90 backdrop-blur rounded-2xl p-6 border border-white/10"
        >
          <h2 class="text-sm text-zinc-400 mb-4">Deposit Funds</h2>

          <!-- seleção de método -->
          <div class="flex gap-3 mb-4">
            <button
              type="button"
              class="px-4 py-2 rounded-lg text-xs"
              :class="method === 'visa' ? 'bg-blue-600' : 'bg-black/40'"
              @click="method = 'visa'"
            >
              VISA
            </button>

            <button
              type="button"
              class="px-4 py-2 rounded-lg text-xs"
              :class="method === 'pix' ? 'bg-blue-600' : 'bg-black/40'"
              @click="method = 'pix'"
            >
              PIX
            </button>
          </div>

          <input
            v-model.number="depositAmount"
            type="number"
            placeholder="€ 0"
            class="w-full bg-black/40 border border-white/10 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            @click="handleCredit"
            class="w-full bg-blue-600 hover:bg-blue-500 transition rounded-lg py-3 font-semibold"
            :disabled="!depositAmount || !method"
          >
            Deposit
          </button>
        </div>

        <!-- WITHDRAW -->
        <div
          class="col-span-4 bg-[#0b1220]/90 backdrop-blur rounded-2xl p-6 border border-white/10"
        >
          <h2 class="text-sm text-zinc-400 mb-4">Withdraw Funds</h2>

          <div
            class="bg-black/30 rounded-xl p-4 mb-4 flex flex-row items-center gap-3"
          >
            <span> <BsBank /></span>
            <span
              ><p class="text-xs text-zinc-400">Bank Transfer</p>
              <p class="text-xs text-zinc-500">
                Processing time: 1–2 business days
              </p></span
            >
          </div>

          <input
            v-model.number="withdrawAmount"
            type="number"
            placeholder="€ 0"
            class="w-full bg-black/40 border border-white/10 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            @click="handleDebit"
            class="w-full bg-indigo-600 hover:bg-indigo-500 transition rounded-lg py-3 font-semibold"
          >
            Withdraw
          </button>

          <p class="text-xs text-zinc-400 mt-3 text-right">
            Max withdrawable: € {{ wallet.balance.toFixed(2) }}
          </p>
        </div>
      </div>

      <!-- TRANSACTIONS -->
      <div
        class="bg-[#0b1220]/90 backdrop-blur rounded-2xl p-6 border border-white/10"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Transaction History</h2>
          <span class="text-xs text-zinc-400">Last 7 entries</span>
        </div>

        <!-- TABLE HEADER -->
        <div class="grid grid-cols-6 px-4 py-2 text-xs text-zinc-400 uppercase">
          <span>Type</span>
          <span>Method</span>
          <span>Transaction ID</span>
          <span class="text-right">Amount</span>
          <span class="text-right">Date</span>
          <span class="text-right">Status</span>
        </div>

        <div class="divide-y divide-white/5">
          <WalletTransaction
            v-for="tx in wallet.transactions"
            :key="tx.id"
            v-bind="tx"
          />
        </div>
      </div>
    </div>
  </div>
</template>
