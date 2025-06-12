<template>
  <div class="tabs">
    <v-btn @click="$emit('change-tab', 'all')"
           rounded="xl"
           color="primary"
           size="large">
      <i class="icon">☰</i> All
    </v-btn>
    <v-btn @click="$emit('change-tab', 'favorites')"
           rounded="xl"
           size="large">
      <i class="icon">⭐</i> Favorites
    </v-btn>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  activeTab: {
    type: String,
    required: true
  }
});

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
