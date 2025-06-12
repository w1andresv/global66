<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import PokemonListItem from '../components/pokemonListItem.vue';
import Tabs from '../components/bottomBar.vue';
import { getPokemonList } from '../services/pokemonService.ts';

const loading = ref( false );

const handleChangeTab = ( tab: any ) => {
  activeTab.value = tab;
};
const activeTab = ref( 'all' ); // 'all' o 'favorites'
let pokemons = reactive<any[]>( [] );


onMounted( () => {
  getList();
  loading.value = true;
  setTimeout( () => {
    loading.value = false;
  }, 3000 );
} );

const getList = async () => {
  const list = await getPokemonList();
  pokemons = list;
};

</script>

<template>
  <div class="loader" v-if="loading">
    <img src="../../src/assets/images/Loader.svg">
  </div>
  <div class="pokemon-list">
    <PokemonListItem
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        :pokemon="pokemon"
        @toggle-favorite="$emit('toggle-favorite', $event)"
    />
  </div>
  <Tabs :activeTab="activeTab" @change-tab="handleChangeTab"/>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
}

.loader {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.pokemon-list {
  flex-grow: 1; /* Permite que la lista crezca y ocupe espacio disponible */
  overflow-y: auto; /* Permite scroll si hay muchos elementos */
  max-height: calc(100vh - 85px); /* Altura máxima para la lista con scroll, ajusta según necesites */
  margin-bottom: 20px;
  padding-bottom: 10px; /* Espacio antes de la línea */
  width: 500px;
  margin-left: auto;
  margin-right: auto;
}
</style>

