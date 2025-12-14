<script setup lang="ts">
defineProps<{
  title: string;
  imgUrl: string;
  url: string;
}>();
</script>

<template>
  <button class="w-32 text-white flex flex-col items-center justify-center">
    <img :src="imgUrl" />
    <span class="text-white font-bold">{{ title }}</span>
  </button>
</template>
