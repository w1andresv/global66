<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <div class="mb-6">
          <v-icon size="120" color="grey-lighten-1">mdi-robot-confused</v-icon>
        </div>
        <h1 class="text-h1 font-weight-bold text-grey-lighten-1 mb-4">404</h1>
        <h2 class="text-h4 mb-4">Página no encontrada</h2>
        <p class="text-h6 text-grey mb-6">
          La página que buscas no existe o ha sido movida.
        </p>
        <v-btn
            color="primary"
            size="large"
            prepend-icon="mdi-home"
            @click="$router.push('/')"
        >
          Volver al inicio
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
