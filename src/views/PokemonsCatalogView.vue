<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const PokemonsList = defineAsyncComponent( () => import('@/components/PokemonsList.vue') );
</script>

<template>
  <PokemonsList></PokemonsList>
</template>

<style scoped>

</style>
