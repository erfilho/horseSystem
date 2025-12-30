<script setup lang="ts">
import formatNumber from "@/utils/formatValue";

const props = defineProps<{
  id: string;
  type: string;
  amount: number;
  createdAt: string;
}>();
</script>

<template>
  <div
    class="bg-content-bg rounded-xl h-20 p-2 w-96 flex flex-col items-center justify-between"
  >
    <div class="flex justify-between w-full">
      <span class="text-lg">
        Value: <b>{{ formatNumber(amount) }}</b>
      </span>
      <span>
        Type: <b>{{ type }}</b>
      </span>
    </div>

    <p class="text-sm w-full">Transaction id: {{ id.slice(0, 6) }}</p>
  </div>
</template>
