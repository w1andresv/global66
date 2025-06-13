<template>

  <v-bottom-navigation>
    <v-btn value="recent" @click="$emit('change-tab', 'all')">
      <v-icon>mdi-history</v-icon>
      <span>Recent</span>
    </v-btn>

    <v-btn value="favorites" @click="$emit('change-tab', 'favorites')">
      <v-icon>mdi-heart</v-icon>
      <span>Favorites</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps( {
  activeTab: {
    type: String,
    required: true
  }
} );

// defineEmits(['change-tab']);
</script>

<style scoped>
/* Estilos sin cambios */
.tabs {
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  padding-top: 10px;
  border-top: 1px solid #eeeeee;
}

.icon {
  font-size: 1.2em;
}
</style>
