<script setup lang="ts">
import formatNumber from "@/utils/formatValue";

const props = defineProps<{
  id: string;
  type: "deposit" | "withdraw";
  amount: number;
  status: "completed" | "pending";
  method: "visa" | "bank" | "pix";
  createdAt: string;
}>();

const isPositive = props.amount > 0;
</script>

<template>
  <div
    class="grid grid-cols-6 items-center px-4 py-3 text-sm hover:bg-white/5 transition rounded-lg"
  >
    <!-- TYPE -->
    <div class="flex items-center gap-2">
      <span
        class="w-2 h-2 rounded-full"
        :class="isPositive ? 'bg-green-400' : 'bg-red-400'"
      />
      <span class="capitalize">{{
        type == "deposit" ? "depósito" : "saque"
      }}</span>
    </div>

    <!-- METHOD -->
    <div class="uppercase text-zinc-400">
      {{ method == "bank" ? "TED" : method == "pix" ? "pix" : "VISA" }}
    </div>

    <!-- TRANSACTION ID -->
    <div class="text-zinc-500">
      {{ id.slice(0, 10) }}
    </div>

    <!-- AMOUNT -->
    <div
      class="font-semibold text-right"
      :class="isPositive ? 'text-green-400' : 'text-red-400'"
    >
      {{ formatNumber(amount) }}
    </div>

    <!-- DATE -->
    <div class="text-zinc-500 text-right">
      {{ new Date(createdAt).toLocaleDateString() }}
    </div>

    <!-- STATUS -->
    <div class="flex justify-end">
      <span
        class="px-3 py-1 rounded-full text-xs font-semibold"
        :class="
          status === 'completed'
            ? 'bg-green-500/20 text-green-400'
            : 'bg-yellow-500/20 text-yellow-400'
        "
      >
        {{ status == "pending" ? "pendente" : "finalizado" }}
      </span>
    </div>
  </div>
</template>
