<template>
  <div class="pokemon-list-item" @click="toggleFavorite">
    <span>{{ pokemon.name }}</span>
    <i :class="['star-icon', { 'is-favorite': pokemon?.favorite }]">⭐</i>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Definir props
const props = defineProps({
  pokemon: {
    type: Object,
    required: true
  }
});

// Definir emits
const emit = defineEmits(['toggle-favorite']);

const toggleFavorite = () => {
  emit('toggle-favorite', props.pokemon.name);
};


</script>

<style scoped>
/* Estilos sin cambios */
.pokemon-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  background-color: #fff;
  transition: background-color 0.2s ease;
}

.pokemon-list-item:hover {
  background-color: #f9f9f9;
}

.pokemon-list-item:last-child {
  border-bottom: none;
}

.pokemon-list-item span {
  font-size: 1.1em;
  color: #333;
}

.star-icon {
  font-size: 1.2em;
  color: #ccc;
}

.star-icon.is-favorite {
  color: #ffc107;
}
</style>
