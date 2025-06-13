<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="container">
        <img src="../assets/images/home.svg">
        <h2>Welcome to Pokédex</h2>
        <p>The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>
        <v-btn @click="clickHandler"
               rounded="xl"
               color="primary"
               class="text-none"
               size="large">
          Get started
        </v-btn>
      </v-col>

    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const clickHandler = () => {
  router.push( '/list' );
};
</script>
<style scoped>

.container {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  height: 100vh;
  align-items: center;
  gap: 3rem;
  padding: 3rem;
}

/* Media queries para dispositivos muy pequeños */
@media screen and (max-width: 480px) {
  .container {
    padding: 1rem;
    gap: 1.5rem;
  }

  .container img {
    width: 85%;
    max-width: 200px;
  }

  .container h2 {
    font-size: 1.5rem;
  }

  .container p {
    font-size: 0.85rem;
  }

  .v-btn {
    scale: 0.9;
  }
}

/* Media queries para dispositivos móviles medianos */
@media screen and (min-width: 481px) and (max-width: 768px) {
  .container {
    padding: 1.5rem;
    gap: 2rem;
  }

  .container img {
    width: 80%;
    max-width: 250px;
  }

  .container h2 {
    font-size: 1.8rem;
  }

  .container p {
    font-size: 0.9rem;
  }
}

/* Media queries para desktop */
@media screen and (min-width: 769px) and (max-width: 1200px) {
  .container img {
    max-width: 350px;
  }
}

/* Media queries para pantallas muy grandes */
@media screen and (min-width: 1201px) {
  .container img {
    max-width: 400px;
  }

  .container h2 {
    font-size: 2.2rem;
  }

  .container p {
    font-size: 1.1rem;
    max-width: 600px;
  }

  .v-btn {
    scale: 1.1;
  }
}
</style>
