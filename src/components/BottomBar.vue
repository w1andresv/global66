<template>
  <div class="bottom-navigation-bar">
    <button :class="['nav-button', { active: activeTab === 'all' }]"
            @click="setActiveTab('all')" >
      <v-icon>mdi-format-list-bulleted-square</v-icon> All
    </button>
    <button :class="['nav-button', { active: activeTab === 'favorites' }]"
            @click="setActiveTab('favorites')">
      <v-icon>mdi-star</v-icon> Favorites
    </button>
  </div>
</template>

<script setup lang="ts">
/**
 * @component BottomBar
 * @description Barra de navegación inferior que permite al usuario alternar entre las vistas
 * "Todos los Pokémon" y "Favoritos". Este componente implementa un diseño responsivo
 * y proporciona retroalimentación visual sobre la pestaña activa actualmente.
 *
 * @props {string} activeTab - Tab actualmente seleccionada ('all' o 'favorites')
 * @emits {string} change-tab - Emite el nombre de la nueva tab seleccionada
 *
 * @example
 * <BottomBar 
 *   :activeTab="currentTab" 
 *   @change-tab="handleTabChange"
 * />
 *
 * @requires vue - Framework progresivo para construir interfaces de usuario
 * @requires defineEmits - Función de Vue para definir eventos emitidos
 *
 * @author Equipo de Desarrollo Pokédex
 * @version 1.0.0
 */
import { ref, defineProps } from 'vue';

/**
 * Define las propiedades que puede recibir el componente
 */
const props = defineProps({
  activeTab: {
    type: String,
    default: 'all',
    validator: (value: string) => ['all', 'favorites'].includes(value)
  }
});

/**
 * Estado reactivo para la tab activa
 * @type {Ref<string>} - Puede ser 'all' o 'favorites'
 */
const activeTab = ref( 'all' );

/**
 * Define los eventos que este componente puede emitir
 * @type {function}
 */
const emit = defineEmits( [ 'change-tab' ] );

/**
 * Cambia la tab activa y emite el evento correspondiente
 * @param {string} tabName - Nombre de la tab seleccionada ('all' o 'favorites')
 * @emits change-tab
 */
const setActiveTab = ( tabName: string ) => {
  activeTab.value = tabName;
  emit( 'change-tab', tabName );
};

</script>

<style scoped>
/**
 * Estilos para el componente BottomBar
 * Implementa un diseño responsivo y proporciona retroalimentación visual sobre la tab activa
 */

/**
 * Contenedor principal de la barra de navegación
 * Fijo en la parte inferior de la pantalla con sombra sutil
 */
.bottom-navigation-bar {
  display: flex;
  justify-content: center; /* Centra los botones horizontalmente */
  align-items: center;
  width: 100%;
  padding: 10px 0;
  background-color: #ffffff; /* Color de fondo */
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* Sombra superior sutil */
  position: fixed; /* Fija la barra en la parte inferior */
  bottom: 0;
  left: 0;
  z-index: 1000; /* Asegura que esté por encima de otros elementos */
}

/**
 * Botones de navegación dentro de la barra
 * Diseñados con bordes redondeados y transiciones suaves
 */
.nav-button {
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  margin: 0 10px; /* Espacio entre los botones */
  border: none;
  border-radius: 25px; /* Bordes redondeados */
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  box-sizing: border-box; /* Incluir padding y border en el ancho/alto */
}

/**
 * Estado inactivo de los botones de navegación
 * Usa color gris con texto blanco para indicar estado inactivo
 */
.nav-button:not(.active) {
  background-color: #BFBFBF; /* Color gris claro */
  color: #ffffff;
}

/**
 * Estado activo de los botones de navegación
 * Usa color rojo vibrante para destacar la tab actualmente seleccionada
 */
.nav-button.active {
  background-color: #F22539; /* Rojo vibrante */
  color: white;
}

/**
 * Media query para dispositivos muy pequeños (móviles, menos de 480px)
 * Reduce el tamaño de los botones para adaptarse a pantallas pequeñas
 */
@media screen and (max-width: 480px) {
  .nav-button {
    min-width: 150px;
    display: flex;
  }
}

</style>
