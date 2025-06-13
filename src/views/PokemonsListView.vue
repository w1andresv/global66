<script setup lang="ts">
/**
 * PokemonsListView - Vista principal que muestra la lista de Pokémon
 *
 * Esta vista maneja:
 * - La carga y visualización de la lista de Pokémon
 * - Estados de carga con loader
 * - Navegación entre tabs (todos/favoritos)
 * - Búsqueda de Pokémon
 * - Gestión de favoritos
 */

import { computed, onMounted, reactive, ref } from 'vue';
import PokemonListItem from '../components/PokemonListItem.vue';
import BottomBar from '../components/BottomBar.vue';
import { getPokemonDetail, getPokemonList } from '../services/pokemonService.ts';
import SearchBar from '@/components/SearchBar.vue';
import type { PokemonResponse } from '@/models/pokemonResponse.interface.ts';
import Modal from '@/components/Modal.vue';
import { usePokemonStore } from '@/store/pokemon.ts';

// ===============================
// DEFINICIÓN DE VARIABLES REACTIVAS
// ===============================

/**
 * Estado de carga para mostrar/ocultar el loader
 * @type {Ref<boolean>}
 */
const loading = ref( false );

/**
 * Estado del diálogo modal
 * @type {Ref<boolean>}
 */
const dialog = ref( false );

/**
 * Tab activa en el componente BottomBar
 * @type {Ref<string>} Puede ser 'all' o 'favorites'
 */
const activeTab = ref( 'all' );

/**
 * Lista reactiva de Pokémon obtenida del servicio
 * @type {Array<any>}
 */
let pokemons = reactive<PokemonResponse[]>( [] );
let selectePokemon = reactive<any>( null );

let searchText = ref<string | null>( null );

// ===============================
// LIFECYCLE HOOKS
// ===============================

/**
 * Hook que se ejecuta cuando el componente es montado
 * Inicializa la carga de datos y el estado de loading
 */
onMounted( () => {
  pokemonStore.loadFavorites();
  getList();
  loading.value = true;
  // Simula tiempo de carga de 3 segundos
  setTimeout( () => {
    loading.value = false;
  }, 3000 );
} );

// ===============================
// MÉTODOS Y FUNCIONES
// ===============================

/**
 * Maneja el cambio de tab en el BottomBar
 * @param {string} tab - El tab seleccionado ('all' o 'favorites')
 */
const handleChangeTab = ( tab: any ) => {
  activeTab.value = tab;
};

/**
 * Obtiene la lista de Pokémon desde el servicio
 * @async
 * @function
 * @returns {Promise<void>}
 */
const getList = async () => {
  const list = await getPokemonList();
  list.map( ( item ) => {
    item.favorite = pokemonStore.isFavorite( item.name );
  } );
  pokemons.push( ...list );
  searchText.value = '';
};
// Inicializar el store
const pokemonStore = usePokemonStore();

const handlerItemClick = ( event: string ) => {
  setFavorite( pokemons, event );
};

const setFavorite = ( pokemons: PokemonResponse[], event: string ) => {
  pokemons.map( ( pokemon: PokemonResponse ) => {
    if( pokemon.name === event ) {
      pokemonStore.toggleFavorite( event );
      pokemon.favorite = !pokemon.favorite;
    }
  } );
};

const handlerInputSearch = ( event: string ) => {
  searchText.value = event;
};

const filteredItems = computed<PokemonResponse[]>( () => {
  if( !searchText.value || searchText.value === '' ) {
    return pokemons; // Si no hay texto, muestra todos los ítems
  }
  const query = searchText.value.toLowerCase();
  return pokemons.filter( ( item: PokemonResponse ) =>
      item.name.toLowerCase().includes( query ) && ( item.favorite || !item.favorite )
  );
} );

const openDetail = async ( event: string ) => {
  await getDetail( event );
  dialog.value = true;
};

const closeModal = () => {
  dialog.value = false;
};

const getDetail = async ( value: string ) => {
  const { height, name, sprites: { other: images }, types, weight } = await getPokemonDetail( value );
  selectePokemon = {
    name,
    height,
    weight,
    imageUrl: images?.[ 'official-artwork' ].front_default,
    types: types.map( t => t.type.name )
  };

};
</script>

<template>
  <!-- Contenedor principal de la vista -->
  <div class="container">

    <!-- Estado de carga: Muestra loader mientras loading = true -->
    <div class="loader" v-if="loading">
      <img src="../../src/assets/images/Loader.svg" alt="Loading...">
    </div>

    <!-- Contenido principal: Se muestra cuando loading = false -->
    <div v-if="!loading">
      <!-- Barra de búsqueda -->
      <SearchBar @search="handlerInputSearch"/>
      <div class="list-container">
        <!-- Lista de Pokémon -->
        <div class="pokemon-list">
          <PokemonListItem
              v-for="pokemon in filteredItems"
              :key="pokemon.name"
              :pokemon="pokemon"
              @open-detail="openDetail"
              @toggle-favorite="handlerItemClick"
          />
        </div>
      </div>

      <!-- Barra de navegación inferior -->
      <BottomBar
          :activeTab="activeTab"
          @change-tab="handleChangeTab"
      />
    </div>
  </div>

  <Modal :visible="dialog" @close="closeModal" :pokemon="selectePokemon"></Modal>

</template>

<style scoped>
/* ===============================
   ESTILOS PRINCIPALES
   =============================== */

/**
 * Contenedor principal de la vista
 * Establece el fondo y espaciado superior
 */
.container {
  background-color: #F9F9F9;
  padding-top: 30px;

}

.list-container {
  height: calc(100vh - 170px);
  overflow: scroll;
}

/**
 * Loader centrado que ocupa toda la pantalla
 * Se muestra durante el estado de carga
 */
.loader {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}

/**
 * Contenedor de la lista de Pokémon
 * Configurado como flexbox con scroll vertical
 */
.pokemon-list {
  min-height: 370px;
  flex-grow: 1; /* Permite que la lista crezca y ocupe espacio disponible */
  overflow-y: auto; /* Permite scroll si hay muchos elementos */
  padding-bottom: 10px; /* Espacio antes de la línea */
  margin-left: auto;
  margin-right: auto;
  gap: 5px;
  display: flex;
  flex-direction: column;
}

/* ===============================
   MEDIA QUERIES RESPONSIVAS
   =============================== */

/**
 * Dispositivos muy pequeños (móviles, menos de 480px)
 * Optimiza el espacio para pantallas pequeñas
 */
@media screen and (max-width: 480px) {
  .pokemon-list {
    width: 95%;
    padding: 0 5px;
    max-height: calc(100vh - 60px);
    gap: 3px;
  }

  .loader img {
    width: 70%;
    max-width: 150px;
  }
}

/**
 * Dispositivos móviles medianos (481px a 768px)
 * Ajustes para tablets y móviles grandes
 */
@media screen and (min-width: 481px) and (max-width: 768px) {
  .pokemon-list {
    width: 90%;
    padding: 0 10px;
    max-height: calc(100vh - 65px);
  }

  .loader img {
    width: 80%;
    max-width: 200px;
  }
}

/**
 * Desktop (769px a 1200px)
 * Establece ancho fijo para escritorio estándar
 */
@media screen and (min-width: 769px) and (max-width: 1200px) {
  .pokemon-list {
    width: 500px;
  }
}

/**
 * Pantallas muy grandes (más de 1200px)
 * Optimiza para monitores grandes y 4K
 */
@media screen and (min-width: 1201px) {
  .pokemon-list {
    width: 600px;
  }

  .container {
    margin: 0 auto;
  }
}
</style>
