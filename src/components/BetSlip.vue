<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";
import { useBetSlipStore } from "@/stores/betSlip.store";
import {
  AnFilledInfoCircle,
  CaArrowsHorizontal,
  FaTrash,
} from "@kalimahapps/vue-icons";
import { computed } from "vue";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import BetCard from "./BetCard.vue";

const betSlip = useBetSlipStore();
const auth = useAuthStore();

const isLogged = computed(() => auth.isAuthenticated);

const formattedStake = computed(() =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "EUR" }).format(
    betSlip.stake,
  ),
);
const formattedReturn = computed(() =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "EUR" }).format(
    betSlip.potentialReturn || 0,
  ),
);

function addValue(value: number) {
  betSlip.stake += value;
}
function clearSlip() {
  betSlip.clear();
}
function removeBet(horse: string) {
  betSlip.removeSelection(horse);
}
function setBetType(type: "single" | "multiple") {
  betSlip.setBetType(type);
}
</script>

<template>
  <aside class="flex flex-col sticky py-4 pr-8 w-full h-[calc(100vh-6rem)]">
    <div
      class="w-full h-full bg-bg-surface rounded-xl border border-white/5 flex flex-col p-2 gap-3 overflow-hidden"
    >
      <!-- Header -->
      <div class="flex items-center justify-between">
        <p class="flex items-center gap-2 text-white font-semibold">
          <span
            class="bg-active-link rounded-full flex items-center justify-center w-7 h-7 text-sm font-bold"
            >{{ betSlip.selections.length }}</span
          >
          Cupom
        </p>
      </div>

      <!-- Bet Type Toggle -->
      <div class="flex flex-row items-start justify-start gap-2">
        <Button
          variant="secondary"
          size="default"
          class="text-sm font-semibold py-2 rounded-lg"
          :class="
            betSlip.betType === 'single'
              ? 'bg-sky-500 text-white'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          "
          @click="setBetType('single')"
          >Simples</Button
        >
        <Button
          variant="secondary"
          class="text-sm font-semibold py-2 rounded-lg"
          :class="
            betSlip.betType === 'multiple'
              ? 'bg-sky-500 text-white'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          "
          @click="setBetType('multiple')"
          >Múltiplo</Button
        >
      </div>

      <!-- Multiples Options -->
      <div class="flex flex-row gap-1 items-start justify-start">
        <Button
          variant="secondary"
          size="sm"
          class="bg-filter-button text-emerald-300 rounded-lg font-semibold"
        >
          Multiples
        </Button>
        <Button
          variant="secondary"
          size="sm"
          class="rounded-lg font-semibold bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
        >
          Trixie
        </Button>
        <Button
          variant="secondary"
          size="sm"
          class="rounded-lg font-semibold bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
        >
          Patent
        </Button>
        <Button
          variant="secondary"
          size="sm"
          class="rounded-lg font-semibold bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
        >
          Doubles
        </Button>
      </div>

      <!-- Selections Scrollable -->
      <div class="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        <BetCard
          v-for="selection in betSlip.selections"
          :key="selection.horseId"
          @remove="removeBet(selection.horseId)"
          v-bind="selection"
        />
      </div>

      <!-- Footer -->
      <div class="space-y-2 pt-2 border-t border-white/5">
        <div class="flex items-center gap-2 text-sm text-zinc-300 px-1">
          <Checkbox id="ew" />
          <CaArrowsHorizontal class="text-sm" />
          <Label for="ew" class="cursor-pointer">E / W</Label>
        </div>

        <div class="flex flex-row justify-between gap-1 px-1">
          <Button
            v-for="val in [2, 5, 10, 25]"
            :key="val"
            variant="secondary"
            class="text-lg flex-1 first:bg-secondary-button border-secondary-button border text-zinc-100 hover:bg-zinc-700 rounded-lg flex items-center"
            @click="addValue(val)"
          >
            € {{ val }}
          </Button>
        </div>

        <div class="space-y-1 px-1">
          <div class="flex justify-between">
            <span>Total odds</span
            ><span class="font-bold">{{ betSlip.totalOdds.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span> Aposta </span><span class="">{{ formattedStake }}</span>
          </div>
          <div class="flex justify-between font-bold">
            <span> GANHO POTENCIAL </span><span>{{ formattedReturn }}</span>
          </div>
        </div>

        <!-- Bet slip footer -->
        <div class="space-y-2 px-1">
          <div
            class="bg-secondary-button text-white/80 flex items-center gap-2 px-2 py-1.5 rounded-lg justify-center"
          >
            <AnFilledInfoCircle class="text-lg" /> Algumas seleções não
            combináveis
          </div>
          <div class="flex flex-row items-center justify-start gap-2">
            <Button
              variant="secondary"
              class="bg-zinc-800 hover:bg-zinc-700 h-10 w-10 rounded-lg"
              @click="clearSlip"
            >
              <FaTrash class="w-4 h-4" />
            </Button>

            <Button
              variant="secondary"
              v-if="isLogged"
              class="flex-1 bg-accent-blue font-semibold rounded-lg"
            >
              Fazer aposta
            </Button>

            <RouterLink to="/login" class="flex-1" v-else>
              <Button
                variant="secondary"
                class="bg-white/80 text-black font-semibold h-10 w-full"
              >
                Entre para apostar
              </Button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
