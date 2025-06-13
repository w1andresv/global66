# Pokédex App 🎮

Una aplicación web moderna de Pokédex desarrollada con Vue.js 3 y TypeScript, que permite explorar y gestionar una colección de Pokémon con funcionalidades de búsqueda y favoritos.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Componentes Principales](#componentes-principales)
- [Servicios](#servicios)
- [Responsive Design](#responsive-design)
- [Scripts Disponibles](#scripts-disponibles)
- [Contribución](#contribución)

## ✨ Características

- 🔍 **Búsqueda de Pokémon**: Sistema de búsqueda en tiempo real
- ❤️ **Sistema de Favoritos**: Guarda y gestiona tus Pokémon favoritos
- 📱 **Diseño Responsivo**: Optimizado para móviles, tablets y desktop
- 🎨 **UI Moderna**: Interfaz atractiva con Vuetify 3
- ⚡ **Carga Rápida**: Optimizado con Vite
- 🔄 **Estados de Carga**: Indicadores visuales durante la carga de datos
- 🧭 **Navegación Intuitiva**: Sistema de tabs y routing

## 🛠 Tecnologías

### Frontend Framework
- **Vue.js 3.5.13** - Framework principal
- **TypeScript 5.8.3** - Tipado estático
- **Composition API** - API moderna de Vue

### UI Framework & Styling
- **Vuetify 3.8.9** - Biblioteca de componentes Material Design
- **Material Design Icons 7.4.47** - Iconografía
- **CSS Media Queries** - Diseño responsivo

### Build Tools & Development
- **Vite 6.3.5** - Build tool y dev server
- **Vue TSC 2.2.8** - Compilador TypeScript para Vue
- **@vitejs/plugin-vue 5.2.3** - Plugin de Vue para Vite
- **vite-plugin-vuetify 2.1.1** - Plugin de Vuetify para Vite

### Estado y Routing
- **Pinia 3.0.3** - Gestión de estado
- **Vue Router 4.5.1** - Enrutamiento

### HTTP Client
- **Axios 1.9.0** - Cliente HTTP para APIs

### Herramientas de Desarrollo
- **@types/node 24.0.1** - Tipos de Node.js
- **@vue/tsconfig 0.7.0** - Configuración TypeScript para Vue
- **@vue/typescript 1.8.20** - Soporte TypeScript para Vue

## 🏗 Arquitectura

El proyecto sigue una arquitectura modular basada en:

### **Composition API + TypeScript**
- Utiliza la Composition API de Vue 3 para mejor reutilización de lógica
- TypeScript para tipado estático y mejor experiencia de desarrollo

### **Arquitectura de Componentes**### **Gestión de Estado**
- **Pinia** para estado global (favoritos, configuración)
- **Refs reactivos** para estado local de componentes

### **Responsive Design**
- Mobile-first approach
- Breakpoints específicos:
    - Móviles pequeños: `< 480px`
    - Móviles medianos: `481px - 768px`
    - Desktop: `769px - 1200px`
    - Pantallas grandes: `> 1200px`

## 🚀 Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm (incluido con Node.js)

### Pasos de instalación

1. **Clonar el repositorio**2. **Instalar dependencias**3. **Iniciar servidor de desarrollo**4. **Abrir en el navegador**## 💻 Uso

### Navegación Principal
- **Home**: Página de bienvenida con acceso directo a la Pokédex
- **Lista de Pokémon**: Vista principal con todos los Pokémon disponibles

### Funcionalidades
- **Buscar**: Utiliza la barra de búsqueda para encontrar Pokémon específicos
- **Favoritos**: Marca/desmarca Pokémon como favoritos
- **Filtros**: Alterna entre "Todos" y "Favoritos" usando los tabs inferiores

## 📁 Estructura del Proyecto## 🧩 Componentes Principales

### **PokemonListItem**
- Muestra información individual de cada Pokémon
- Gestiona estado de favorito
- Responsive design para diferentes pantallas

### **SearchBar**
- Búsqueda en tiempo real
- Emisión de eventos para filtrado
- Optimizado para mobile

### **BottomBar**
- Navegación entre "Todos" y "Favoritos"
- Utiliza Vuetify's v-bottom-navigation

### **HomeView**
- Página de bienvenida
- Navegación hacia la lista principal
- Diseño centrado y atractivo

### **PokemonsListView**
- Vista principal de la aplicación
- Gestión de estados de carga
- Integración de todos los componentes

## 🔧 Servicios

### **pokemonService**## 📱 Responsive Design

### Breakpoints Implementados

| Dispositivo | Rango | Características |
|-------------|-------|-----------------|
| Móvil Pequeño | < 480px | Máxima optimización de espacio |
| Móvil Mediano | 481px - 768px | Ajustes para tablets pequeñas |
| Desktop | 769px - 1200px | Ancho fijo optimizado |
| Pantalla Grande | > 1200px | Mejor aprovechamiento del espacio |

### Características Responsivas
- **Imágenes adaptivas**: Escalado automático según dispositivo
- **Typography scaling**: Tamaños de fuente adaptativos
- **Layout flexible**: Distribución optimizada por pantalla
- **Touch-friendly**: Botones y controles optimizados para touch

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Build
npm run build        # Construye para producción
npm run preview      # Preview del build de producción

# Linting y Type Checking
npm run type-check   # Verificación de tipos TypeScript
```
Esta documentación cubre todos los aspectos importantes del proyecto basándome en la información disponible en los archivos. Incluye la arquitectura, dependencias, estructura, componentes y guías para desarrollo y contribución.
