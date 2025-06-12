<template>
  <div class="search-bar">
    <input
        type="text"
        placeholder="Search"
        v-model="searchTerm"
        @input="$emit('search', searchTerm)"
    />
    <i class="search-icon">🔍</i>
  </div>
</template>

<script setup>
import {ref} from "vue";

const searchTerm = ref('')

</script>

<style scoped>
.search-bar {
  position: relative;
  margin-bottom: 20px;
}

.search-bar input[type="text"] {
  width: calc(100% - 40px); /* Ajusta el ancho para el icono */
  padding: 10px 10px 10px 40px; /* Espacio para el icono */
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: #f8f8f8; /* Un poco de gris claro */
}

.search-bar .search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
}
</style>
