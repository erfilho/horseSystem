<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import Button from "@/components/ui/button/Button.vue";
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
    class="min-h-screen w-full text-white grid grid-cols-[240px_1fr] bg-bg-main"
  >
    <aside class="h-full overflow-y-auto">
      <Sidebar />
    </aside>

    <!-- CONTENT -->
    <div class="px-6 py-4 text-white space-y-6 w-4/5 mx-auto">
      <!-- TABS -->
      <div class="flex gap-6 border-b border-white/10">
        <button
          class="pb-3 text-blue-400 border-b-2 border-blue-400 font-semibold"
        >
          Resumo
        </button>
      </div>

      <!-- MAIN GRID -->
      <div class="grid grid-cols-12 gap-6">
        <!-- BALANCE OVERVIEW -->
        <div
          class="col-span-4 bg-bg-surface rounded-2xl p-6 border border-white/10"
        >
          <h2 class="text-zinc-400 mb-4">Resumo</h2>

          <div class="bg-bg-main rounded-xl p-6">
            <p class="text-xs text-zinc-400">Saldo</p>
            <p class="text-4xl font-bold mt-2">
              R$ {{ wallet.balance.toFixed(2) }}
            </p>
          </div>

          <div class="mt-6 space-y-3">
            <div class="flex justify-between text-zinc-300">
              <span>Bônus</span>
              <span class="text-blue-400">R$ 0.00</span>
            </div>
            <div class="flex justify-between">
              <span>Dinheiro</span>
              <span>R$ {{ wallet.balance.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- DEPOSIT -->
        <div
          class="col-span-4 bg-bg-surface rounded-2xl p-6 border border-white/10 flex flex-col h-full justify-start"
        >
          <h2 class="text-zinc-400 mb-4">Depósito</h2>

          <!-- seleção de método -->
          <div class="flex gap-3 mb-4">
            <Button
              variant="secondary"
              class="px-4 py-2 rounded-lg text-xs"
              :class="method === 'visa' ? 'bg-blue-600' : 'bg-black/40'"
              @click="method = 'visa'"
            >
              VISA
            </Button>

            <Button
              variant="secondary"
              class="px-4 py-2 rounded-lg text-xs"
              :class="method === 'pix' ? 'bg-blue-600' : 'bg-black/40'"
              @click="method = 'pix'"
            >
              PIX
            </Button>
          </div>

          <input
            v-model.number="depositAmount"
            type="number"
            placeholder="R$ 0,00"
            class="w-full bg-bg-main border border-white/10 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Button
            variant="secondary"
            @click="handleCredit"
            class="w-full bg-blue-600 hover:bg-blue-500 transition rounded-lg py-3 font-semibold justify-self-end-safe"
            :disabled="!depositAmount || !method"
          >
            Depositar valor
          </Button>
        </div>

        <!-- WITHDRAW -->
        <div
          class="col-span-4 bg-bg-surface rounded-2xl p-6 border border-white/10"
        >
          <h2 class="text-zinc-400 mb-4">Solicitar saque</h2>

          <div
            class="bg-bg-card rounded-xl p-4 mb-4 flex flex-row items-center gap-3"
          >
            <span> <BsBank /></span>
            <span
              ><p class="text-xs text-zinc-400">Transferência TED</p>
              <p class="text-xs text-zinc-500">
                Tempo de processamento: 1 - 2 dias úteis
              </p></span
            >
          </div>

          <input
            v-model.number="withdrawAmount"
            type="number"
            placeholder="R$ 0.00"
            class="w-full bg-black/40 border border-white/10 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Button
            @click="handleDebit"
            class="w-full bg-blue-600 hover:bg-blue-500 transition rounded-lg py-3 font-semibold"
          >
            Sacar
          </Button>

          <p class="text-sm text-zinc-400 mt-3 text-right">
            Disponível para saque: R$ {{ wallet.balance.toFixed(2) }}
          </p>
        </div>
      </div>

      <!-- TRANSACTIONS -->
      <div
        class="bg-bg-surface backdrop-blur rounded-2xl p-6 border border-white/10"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Transações recentes</h2>
          <span class="text-xs text-zinc-400">Últimas 7 movimentações</span>
        </div>

        <!-- TABLE HEADER -->
        <div class="grid grid-cols-6 px-4 py-2 text-xs text-zinc-400 uppercase">
          <span>Tipo</span>
          <span>Método</span>
          <span>Id da transação</span>
          <span class="text-right">Valor</span>
          <span class="text-right">Data</span>
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
