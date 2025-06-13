<script setup lang="ts">
/**
 * @component PokemonsList
 * @description Componente principal que muestra la lista de Pokémon y coordina todas las funcionalidades
 * de la aplicación Pokédex. Este componente actúa como un contenedor de orquestación que integra
 * múltiples subcomponentes y gestiona el estado global de la aplicación.
 *
 * @features
 * - Carga y visualización de la lista de Pokémon desde la API
 * - Estados de carga con animación de loader
 * - Navegación entre vistas "Todos los Pokémon" y "Favoritos"
 * - Integración con el sistema de búsqueda global
 * - Gestión de Pokémon favoritos con persistencia
 * - Visualización detallada de Pokémon seleccionados
 * - Diseño completamente responsivo para todos los dispositivos
 * - Manejo de estado vacío cuando no se encuentran resultados
 *
 * @requires Vue Composition API
 * @requires Pinia Store
 * @requires Vuetify Components
 * @requires Pokemon API Service
 *
 * @author Equipo de Desarrollo Pokédex
 * @version 1.1.0
 */

/**
 * Importaciones de Vue y Composition API
 */
import { computed, onMounted, reactive, ref } from 'vue';

/**
 * Importaciones de componentes internos
 */
import PokemonListItem from './PokemonListItem.vue';
import BottomBar from './BottomBar.vue';
import SearchBar from '../components/SearchBar.vue';
import Modal from '../components/Modal.vue';

/**
 * Importaciones de store para gestión de estado
 */
import { usePokemonStore } from '../store/pokemon.ts';
import { usePokemonData } from '../composables/usePokemonData.ts';
import type { PokemonResponse } from '../models/pokemonResponse.interface.ts';


/**
 * Store global de Pokémon para gestionar favoritos y búsqueda
 * @constant {Object} pokemonStore - Instancia del store de Pinia
 */
const pokemonStore = usePokemonStore();

const {
  pokemons,
  loadPokemonList,
  loadPokemonDetail,
  toggleFavorite,
  loading
} = usePokemonData();

/**
 * Propiedad computada que filtra la lista de Pokémon según múltiples criterios
 * Combina el filtrado por texto de búsqueda y por tab seleccionada
 * Esta propiedad se recalcula automáticamente cuando cambia:
 * - El texto de búsqueda en el store
 * - La tab activa (todos/favoritos)
 * - La lista base de Pokémon
 *
 * @type {ComputedRef<PokemonResponse[]>}
 * @returns {PokemonResponse[]} Lista filtrada de Pokémon según los criterios actuales
 */
const filteredItems = computed<PokemonResponse[]>( () => {
  // Comenzamos con la lista completa
  let filtered = pokemons;
  // FILTRO 1: Por texto de búsqueda (si existe)
  const currentSearchText = pokemonStore.getSearchText;
  if( currentSearchText && currentSearchText !== '' ) {
    const query = currentSearchText.toLowerCase();
    filtered = filtered.filter( ( item: PokemonResponse ) =>
        item.name.toLowerCase().includes( query )
    );
  }

  // FILTRO 2: Por tab activa (todos/favoritos)
  if( activeTab.value === 'favorites' ) {
    filtered = filtered.filter( ( item: PokemonResponse ) => item.favorite );
  }

  return filtered;
} );


/**
 * Estado del diálogo modal para detalles de Pokémon
 * @type {Ref<boolean>} - true cuando el modal está abierto, false cuando está cerrado
 */
const dialog = ref( false );

/**
 * Tab actualmente seleccionada en la barra de navegación inferior
 * @type {Ref<string>} - Puede ser 'all' (todos los Pokémon) o 'favorites' (solo favoritos)
 */
const activeTab = ref( 'all' );
let selectedPokemon = reactive<any>( null );

// ===============================
// LIFECYCLE HOOKS
// ===============================

/**
 * Hook del ciclo de vida que se ejecuta cuando el componente es montado en el DOM
 * Realiza 3 acciones principales:
 * 1. Carga los Pokémon favoritos desde localStorage
 * 2. Inicia la petición a la API para obtener la lista de Pokémon
 * 3. Configura el estado de carga con animación
 *
 * @lifecycle onMounted - Se ejecuta después de que el componente es insertado en el DOM
 */
onMounted( async () => {
  // Carga favoritos guardados en localStorage
  pokemonStore.loadFavorites();
  setTimeout( () => {
    loadPokemonList();
  }, 500 );
} );

// ===============================
// MÉTODOS Y FUNCIONES
// ===============================

/**
 * Maneja el cambio de tab en la barra de navegación inferior
 * Actualiza el estado local para filtrar la lista según la selección
 *
 * @param {string} tab - El tab seleccionado ('all' o 'favorites')
 */
const handleChangeTab = ( tab: string ) => {
  activeTab.value = tab;
};


/**
 * Manejador para el evento de clic en botón de favorito
 * Actúa como método intermediario que llama a setFavorite con los parámetros adecuados
 *
 * @param {string} event - Nombre del Pokémon a marcar/desmarcar como favorito
 */
const handlerItemClick = ( event: string ) => {
  toggleFavorite( event );
};


/**
 * Abre el modal con los detalles de un Pokémon específico
 * Primero obtiene los datos detallados y luego muestra el modal
 *
 * @async
 * @param {string} event - Nombre del Pokémon cuyos detalles se desean ver
 */
const openDetail = async ( event: string ) => {
  // Obtiene los datos detallados del Pokémon
  selectedPokemon = await loadPokemonDetail( event );
  // Muestra el modal
  dialog.value = true;
};

/**
 * Cierra el modal de detalles
 */
const closeModal = () => {
  dialog.value = false;
};

/**
 * Manejador para el botón "Go back home" cuando no hay resultados
 * Limpia el texto de búsqueda para mostrar todos los Pokémon nuevamente
 */
const clickBackHandler = () => {
  pokemonStore.setSearchText( '' );
};
</script>

<template>
  <!-- 
    ESTRUCTURA PRINCIPAL DEL COMPONENTE

    Este template tiene tres secciones principales:
    1. Estado de carga con animación
    2. Contenido principal con lista de Pokémon
    3. Modal de detalles (condicionalmente visible)

    La navegación utiliza un enfoque condicional para mostrar diferentes vistas
    según el estado de carga y los resultados de filtrado.
  -->

  <!-- Contenedor principal de la vista -->
  <div class="container">

    <!-- SECCIÓN 1: ESTADO DE CARGA -->
    <!-- Muestra un loader animado mientras se cargan los datos iniciales -->
    <div class="loader" v-if="loading">
      <img class="animate__animated animate__rotateIn animate__infinite"
           src="../assets/images/Loader.svg"
           alt="Loading..."
           width="300">
    </div>

    <!-- Contenido principal: Se muestra cuando loading = false -->
    <div v-if="!loading">
      <!-- Barra de búsqueda -->
      <SearchBar/>
      <div class="list-container" :class="{ 'no-itmes': filteredItems.length<=0 }">
        <!-- Lista de Pokémon -->
        <div class="not-found-items" v-if="filteredItems.length<=0 && pokemonStore.getSearchText ">
          <h1>Uh-oh!</h1>
          <p>You look lost on your journey!</p>
          <v-btn @click="clickBackHandler"
                 rounded="xl"
                 color="primary"
                 class="text-none"
                 size="large">
            Go back home
          </v-btn>
        </div>
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
      <BottomBar v-if="filteredItems.length>0"
                 :activeTab="activeTab"
                 @change-tab="handleChangeTab"
      />
    </div>
  </div>

  <Modal :visible="dialog" @close="closeModal" :pokemon="selectedPokemon" @toggle-favorite="handlerItemClick"></Modal>

</template>

<style scoped>
/**
 * Estilos para el componente PokemonsList
 * Implementa un diseño responsivo con adaptaciones para diferentes dispositivos
 */

/* ===============================
   ESTILOS PRINCIPALES
   =============================== */

/**
 * Contenedor principal de la vista
 * Establece un fondo neutro claro, espaciado superior y altura completa
 * para asegurar que todo el contenido se muestre correctamente
 */
.container {
  background-color: #F9F9F9; /* Fondo neutro para mejor contraste */
  padding-top: 30px; /* Espacio superior para separación del borde */
  height: 100vh; /* Altura completa de la ventana */
}

/**
 * Contenedor de la lista con scroll
 * Calcula dinámicamente la altura disponible restando el espacio para header y footer
 */
.list-container {
  height: calc(100vh - 170px); /* Altura disponible ajustada */
  overflow: scroll; /* Permite scroll cuando el contenido excede el espacio */
}

/**
 * Modificador para cuando no hay elementos en la lista
 * Ajusta la altura y el scroll para mostrar el mensaje de "no encontrado"
 */
.list-container .no-itmes {
  height: auto; /* Altura automática según contenido */
  overflow: scroll; /* Mantiene scroll por consistencia */
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

.not-found-items {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
</style>
