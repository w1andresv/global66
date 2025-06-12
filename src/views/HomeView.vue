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
            size="large">
          Get started
        </v-btn>
      </v-col>

    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const clickHandler=()=>{
  router.push('/list')
}
</script>
<style scoped>
.v-btn {
  width: fit-content;
}

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
</style>
