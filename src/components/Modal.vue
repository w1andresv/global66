<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';


// Definición de la interfaz del Pokémon
interface Pokemon {
  id: number | null;
  name: string;
  imageUrl: string;
  weight: number | null;
  height: number | null;
  types: string[];
  favorite: boolean;
}

// 1. Definir las props que el componente padre puede pasar
const props = defineProps( {
  // Para que v-model funcione en el componente padre, necesitamos una prop 'visible'
  // y un evento 'update:visible'.
  visible: {
    type: Boolean,
    default: false,
  },
  pokemon: {
    type: Object as () => Pokemon, // Usar un type guard para el objeto
    default: () => ( {
      id: null,
      name: '',
      imageUrl: '',
      weight: null,
      height: null,
      types: [],
      favorite: false
    } )
  }
} );
const snackbar = ref<boolean>( false );

const emit = defineEmits<{
  ( e: 'update:visible', value: boolean ): void;
  ( e: 'close' ): void;
}>();

const closeModal = () => {
  emit( 'update:visible', false );
  emit( 'close' );
};


const sharePokemon = async ( pokemon: Pokemon ): Promise<void> => {
  const pokemonData = [
    pokemon.name,
    `weight: ${ pokemon.weight }`,
    `height: ${ pokemon.height }`,
    `types: ${ pokemon.types.join( ', ' ) }`
  ];

  try {
    await navigator.clipboard.writeText( pokemonData.join( ', ' ) );
    snackbar.value = true;
  } catch ( err ) {
    console.error( 'Failed to copy text: ', err );
  }
};
</script>

<template>
  <v-dialog
      :model-value="visible" @update:model-value="emit('update:visible', $event)" max-width="550" width="80vw">
    <v-card class="pokemon-modal-card">
      <span @click="closeModal">
      <v-icon @click="closeModal" class="icon">mdi-close-circle</v-icon>
      </span>
      <div class="pokemon-image-container">
        <v-img
            :src="pokemon?.imageUrl"
            :alt="pokemon?.name"
            contain
            height="180px"
            class="pokemon-image"
        ></v-img>
      </div>

      <v-card-text class="pokemon-details">
        <v-row no-gutters class="detail-row">
          <v-col cols="4" class="detail-label">Name:</v-col>
          <v-col cols="8" class="detail-value">{{ pokemon?.name }}</v-col>
        </v-row>
        <v-row no-gutters class="detail-row">
          <v-col cols="4" class="detail-label">Weight:</v-col>
          <v-col cols="8" class="detail-value">{{ pokemon?.weight }}</v-col>
        </v-row>
        <v-row no-gutters class="detail-row">
          <v-col cols="4" class="detail-label">Height:</v-col>
          <v-col cols="8" class="detail-value">{{ pokemon?.height }}</v-col>
        </v-row>
        <v-row no-gutters class="detail-row">
          <v-col cols="4" class="detail-label">Types:</v-col>
          <v-col cols="8" class="detail-value">{{ pokemon?.types.join( ', ' ) }}</v-col>
        </v-row>
      </v-card-text>

      <v-spacer></v-spacer>
      <div class="buttons">
        <v-btn @click="sharePokemon(pokemon)"
               rounded="xl"
               class="text-none"
               color="primary"
               size="large">
          Share to my friends
        </v-btn>
        <img :src="`../../src/assets/images/${pokemon.favorite?'fav-':''}star.svg`">
      </div>
    </v-card>
  </v-dialog>

  <v-snackbar v-model="snackbar" :timeout="2000">
    Datos copiados
  </v-snackbar>
</template>

<style scoped>
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-left: 30px;
  padding-right: 30px;
}

.detail-row {
  padding: 10px;
  border-bottom: 1px solid #E8E8E8;
}

.detail-label {
  font-weight: bold;
}

.icon {
  position: absolute;
  right: 0;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1000;
}

.pokemon-image-container {
  background-image: url(../assets/images/background-detail.svg);
  width: 100%;
}

.preview {
  z-index: 9999;
  position: absolute;
}
</style>
