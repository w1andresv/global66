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
import {defineEmits, ref, watch} from "vue";
import {debounce} from "vuetify/lib/util/index.js";

const searchText = ref('')


// Definir emits
const emit = defineEmits(['search']);

watch(searchText, debounce((newValue) => {
  emit('search', newValue);
}, 200));

</script>

<style scoped>
.search-bar {
  position: relative;
  margin-bottom: 30px;

}

.search-bar input[type="text"] {
  width: 100%; /* Ajusta el ancho para el icono */
  padding: 10px 10px 10px 40px; /* Espacio para el icono */
  border-radius: 5px;
  font-size: 16px;
  background-color: #ffffff; /* Un poco de gris claro */
  box-shadow: 0px 2px 10px 0px #0000000A;
}

.search-bar .search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
}

/* Media queries para dispositivos muy pequeños */
@media screen and (max-width: 480px) {
  .search-bar {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
  }

  .search-bar input[type="text"] {
    font-size: 13px;
    padding: 7px 7px 7px 30px;
  }

  .search-bar .search-icon {
    left: 10px;
    font-size: 0.8rem;
  }
}

/* Media queries para dispositivos móviles medianos */
@media screen and (min-width: 481px) and (max-width: 768px) {
  .search-bar {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }

  .search-bar input[type="text"] {
    font-size: 14px;
    padding: 8px 8px 8px 35px;
  }

  .search-bar .search-icon {
    left: 12px;
    font-size: 0.9rem;
  }
}

/* Media queries para desktop */
@media screen and (min-width: 769px) and (max-width: 1200px) {
  .search-bar {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
}

/* Media queries para pantallas muy grandes */
@media screen and (min-width: 1201px) {
  .search-bar {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .search-bar input[type="text"] {
    font-size: 18px;
    padding: 12px 12px 12px 45px;
    border-radius: 8px;
  }

  .search-bar .search-icon {
    left: 18px;
    font-size: 1.1rem;
  }
}
</style>
