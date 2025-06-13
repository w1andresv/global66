<template>
  <div class="pokemon-list-item">
    <div class="name" @click="openDetail">
      <span class="pokemon-name">{{ pokemon.name }}</span>
    </div>
    <img @click="toggleFavorite" :src="`../../src/assets/images/${pokemon?.favorite?'fav-':''}star.svg`">
  </div>
</template>


<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

// Definir props
const props = defineProps( {
  pokemon: {
    type: Object,
    required: true
  }
} );

// Definir emits
const emit = defineEmits( [ 'toggle-favorite', 'open-detail' ] );

const toggleFavorite = () => {
  emit( 'toggle-favorite', props.pokemon.name );
};
const openDetail = () => {
  emit( 'open-detail', props.pokemon.name );
};

</script>

<style scoped>
.pokemon-name {
  text-transform: capitalize;
}

.pokemon-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  height: 60px;
  background-color: #fff;
  transition: background-color 0.2s ease;
}

.pokemon-list-item:hover {
  background-color: #f3f3f3;
}

.pokemon-list-item:last-child {
  border-bottom: none;
}

.pokemon-list-item .name {
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;

}

.pokemon-list-item span {
  padding-left: 12px;
  font-size: 1.1em;
  color: #333;
}

.pokemon-list-item img {
  padding-right: 12px;
  color: #333;
}

</style>
