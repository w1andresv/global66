<template>
  <div class="search-bar">
    <input
        type="text"
        placeholder="Search"
        v-model="searchText"
    />
    <i class="search-icon">
      <v-icon>mdi-magnify</v-icon>
    </i>
  </div>
</template>

<script setup lang="ts">
/**
 * @component SearchBar
 * @description Componente de barra de búsqueda que permite filtrar Pokémon por su nombre.
 * Implementa búsqueda en tiempo real con una función debounce para optimizar el rendimiento.
 * Se integra con el store de Pinia para mantener sincronizado el estado de búsqueda en toda la aplicación.
 *
 * @features
 * - Sincronización bidireccional con el store global
 * - Debounce para reducir llamadas innecesarias durante la escritura rápida
 * - Diseño responsivo para diferentes tamaños de pantalla
 * - Icono de búsqueda integrado
 *
 * @usage Este componente se utiliza en la vista principal de la lista de Pokémon
 * para proporcionar funcionalidad de filtrado por nombre.
 *
 * @example
 * <SearchBar />
 *
 * @requires vue - Framework progresivo para construir interfaces de usuario
 * @requires vuetify - Framework de componentes Material Design para Vue
 * @requires pinia - Biblioteca de gestión de estado para Vue
 *
 * @author Equipo de Desarrollo Pokédex
 * @version 1.0.0
 */
import {  ref, watch } from 'vue';
import { debounce } from 'vuetify/lib/util/index.js';
import { usePokemonStore } from './../store/pokemon.ts';

/**
 * Inicializa el store de Pinia para acceder al estado global de búsqueda
 * @constant {Object} pokemonStore - Instancia del store de Pokémon
 */
const pokemonStore = usePokemonStore();

/**
 * Variable reactiva que almacena el texto de búsqueda actual
 * Se inicializa con el valor actual del store para mantener la consistencia
 * @type {Ref<string>}
 */
const searchText = ref( pokemonStore.getSearchText );

/**
 * Observa cambios en el store global y actualiza el estado local
 * Esto permite que el componente reaccione cuando otros componentes
 * modifican el texto de búsqueda en el store
 * 
 * @listens pokemonStore.getSearchText - Cambios en el texto de búsqueda del store
 */
watch(() => pokemonStore.getSearchText, (newValue) => {
  if (searchText.value !== newValue) {
    searchText.value = newValue;
  }
});

/**
 * Observa cambios en el input de búsqueda y actualiza el store global
 * Utiliza debounce para evitar actualizaciones excesivas durante la escritura rápida,
 * mejorando el rendimiento y la experiencia del usuario
 * 
 * @param {string} newValue - Nuevo valor del texto de búsqueda
 * @listens searchText - Cambios en el input local
 * @fires pokemonStore.setSearchText - Actualiza el estado global
 */
watch( searchText, debounce( ( newValue:string ) => {
  if (pokemonStore.getSearchText !== newValue) {
    pokemonStore.setSearchText(newValue);
  }
}, 200 ) );

</script>

<style scoped>
/**
 * Estilos para el componente SearchBar
 * Implementa un diseño responsivo con adaptaciones específicas para diferentes tamaños de pantalla
 */

/**
 * Contenedor principal de la barra de búsqueda
 * Posicionamiento relativo para permitir el posicionamiento absoluto del icono
 */
.search-bar {
  position: relative;
  margin-bottom: 30px;
}

/**
 * Estilo del campo de entrada de texto
 * Diseñado con bordes redondeados, sombra sutil y padding asimétrico para acomodar el icono
 */
.search-bar input[type="text"] {
  width: 100%; /* Ocupa todo el ancho disponible */
  padding: 10px 10px 10px 40px; /* Padding extra a la izquierda para el icono */
  border-radius: 5px;
  font-size: 16px;
  background-color: #ffffff; 
  box-shadow: 0px 2px 10px 0px #0000000A; /* Sombra sutil para efecto elevado */
  border: none; /* Elimina el borde predeterminado */
  outline: none; /* Elimina el contorno al enfocar */
}

/**
 * Estilo del icono de búsqueda
 * Posicionado absolutamente dentro del contenedor relativo para aparecer dentro del input
 */
.search-bar .search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%); /* Centrado vertical perfecto */
  color: #888; /* Color gris para contraste suave */
  pointer-events: none; /* Permite hacer clic a través del icono */
}

/**
 * Media query para dispositivos muy pequeños (móviles, menos de 480px)
 * Reduce tamaños y espaciado para optimizar el espacio en pantallas pequeñas
 */
@media screen and (max-width: 480px) {
  .search-bar {
    width: 95%; /* Ocupa casi todo el ancho disponible */
    margin-left: auto;
    margin-right: auto;
  }

  .search-bar input[type="text"] {
    font-size: 13px; /* Texto más pequeño */
    padding: 7px 7px 7px 30px; /* Padding reducido */
  }

  .search-bar .search-icon {
    left: 10px; /* Posición ajustada */
    font-size: 0.8rem; /* Icono más pequeño */
  }
}

/**
 * Media query para dispositivos móviles medianos (481px a 768px)
 * Ajustes para tablets y móviles en orientación horizontal
 */
@media screen and (min-width: 481px) and (max-width: 768px) {
  .search-bar {
    width: 90%; /* Ancho ligeramente menor que en móviles pequeños */
    margin-left: auto;
    margin-right: auto;
  }

  .search-bar input[type="text"] {
    font-size: 14px; /* Tamaño de fuente intermedio */
    padding: 8px 8px 8px 35px; /* Padding intermedio */
  }

  .search-bar .search-icon {
    left: 12px; /* Posición ajustada */
    font-size: 0.9rem; /* Tamaño de icono intermedio */
  }
}

/**
 * Media query para dispositivos desktop (769px a 1200px)
 * Establece un ancho máximo para mantener la legibilidad óptima
 */
@media screen and (min-width: 769px) and (max-width: 1200px) {
  .search-bar {
    max-width: 500px; /* Ancho fijo para mejor legibilidad */
    margin-left: auto;
    margin-right: auto; /* Centrado horizontal */
  }
}

/**
 * Media query para pantallas muy grandes (más de 1200px)
 * Aprovecha el espacio adicional con componentes más grandes y mejor espaciados
 */
@media screen and (min-width: 1201px) {
  .search-bar {
    max-width: 600px; /* Ancho mayor pero controlado */
    margin-left: auto;
    margin-right: auto; /* Centrado horizontal */
  }

  .search-bar input[type="text"] {
    font-size: 18px; /* Texto más grande para mejor legibilidad */
    padding: 12px 12px 12px 45px; /* Padding más generoso */
    border-radius: 8px; /* Bordes más redondeados */
  }

  .search-bar .search-icon {
    left: 18px; /* Posición ajustada */
    font-size: 1.1rem; /* Icono más grande */
  }
}
</style>
