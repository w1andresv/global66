<template>
  <v-app>
    <!-- Contenido principal -->
    <v-main>
      <v-container>
        <h1>Página: {{ currentPage }}</h1>
        <p>Contenido de la página {{ currentPage }}</p>
      </v-container>
    </v-main>

    <!-- Bottom Navigation Custom -->
    <v-bottom-navigation
        v-model="activeTab"
        :bg-color="navBgColor"
        :height="navHeight"
        grow
        shift
        class="custom-bottom-nav"
    >
      <v-btn
          v-for="item in navItems"
          :key="item.value"
          :value="item.value"
          @click="navigateTo(item.value)"
          class="nav-btn"
          :class="{ 'nav-btn--active': activeTab === item.value }"
      >
        <v-badge
            v-if="item.badge"
            :content="item.badge"
            color="red"
            offset-x="10"
            offset-y="10"
        >
          <v-icon
              :color="activeTab === item.value ? activeColor : inactiveColor"
              :size="iconSize"
          >
            {{ item.icon }}
          </v-icon>
        </v-badge>
        <v-icon
            v-else
            :color="activeTab === item.value ? activeColor : inactiveColor"
            :size="iconSize"
        >
          {{ item.icon }}
        </v-icon>

        <span
            :class="[
            'nav-label',
            { 'nav-label--active': activeTab === item.value }
          ]"
        >
          {{ item.text }}
        </span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'CustomBottomNav',
  setup() {
    const activeTab = ref('home')

    // Configuración del navigation
    const navItems = ref([
      {
        text: 'Inicio',
        icon: 'mdi-home',
        value: 'home'
      },
      {
        text: 'Buscar',
        icon: 'mdi-magnify',
        value: 'search'
      },
      {
        text: 'Favoritos',
        icon: 'mdi-heart',
        value: 'favorites',
        badge: '3' // Badge opcional
      },
      {
        text: 'Perfil',
        icon: 'mdi-account',
        value: 'profile'
      },
      {
        text: 'Más',
        icon: 'mdi-dots-horizontal',
        value: 'more'
      }
    ])

    // Estilos personalizables
    const navBgColor = ref('white')
    const activeColor = ref('#1976D2')
    const inactiveColor = ref('#757575')
    const navHeight = ref(70)
    const iconSize = ref(24)

    // Computed para mostrar página actual
    const currentPage = computed(() => {
      const item = navItems.value.find(item => item.value === activeTab.value)
      return item ? item.text : ''
    })

    // Método para navegación
    const navigateTo = (page) => {
      activeTab.value = page
      console.log(`Navegando a: ${page}`)
      // Aquí puedes agregar la lógica de navegación con Vue Router
      // this.$router.push({ name: page })
    }

    return {
      activeTab,
      navItems,
      navBgColor,
      activeColor,
      inactiveColor,
      navHeight,
      iconSize,
      currentPage,
      navigateTo
    }
  }
}
</script>

<style scoped>
.custom-bottom-nav {
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

.nav-btn {
  flex-direction: column;
  min-width: 64px;
  padding: 8px 12px;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background-color: rgba(25, 118, 210, 0.08);
}

.nav-btn--active {
  background-color: rgba(25, 118, 210, 0.12);
}

.nav-label {
  font-size: 12px;
  margin-top: 4px;
  color: #757575;
  transition: color 0.3s ease;
  font-weight: 500;
}

.nav-label--active {
  color: #1976D2;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 600px) {
  .nav-label {
    font-size: 10px;
  }
}

/* Animación para badges */
.v-badge {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
