import { defineStore } from 'pinia';

// Opcional: Interfaz para el estado si quieres un tipado estricto
interface PokemonStoreState {
    favoritePokemons: string[];
    searchText: string;
}

export const usePokemonStore = defineStore( 'pokemon', {
    state: (): PokemonStoreState => ( {
        // Inicializamos con un array vacío.
        // Podrías cargarlo desde localStorage aquí si quisieras persistencia.
        favoritePokemons: [],
        searchText: ''
    } ),
    getters: {
        // Getter para verificar si un Pokémon es favorito
        isFavorite: ( state ) => ( pokemonName: string ): boolean => {
            return state.favoritePokemons.includes( pokemonName );
        },
        // Getter para obtener el número total de favoritos
        favoriteCount: ( state ): number => {
            return state.favoritePokemons.length;
        },
        getSearchText: ( state ): string => {
            return state.searchText;
        },
    },
    actions: {
        // Acción para añadir o quitar un Pokémon de favoritos
        toggleFavorite( pokemonName: string ) {
            const index = this.favoritePokemons.indexOf( pokemonName );
            if( index === -1 ) {
                // No es favorito, añadirlo
                this.favoritePokemons.push( pokemonName );
            } else {
                // Es favorito, quitarlo
                this.favoritePokemons.splice( index, 1 );
            }
            // Opcional: Persistir en localStorage después de cada cambio
            localStorage.setItem( 'favoritePokemons', JSON.stringify( this.favoritePokemons ) );
        },
        // Opcional: Cargar favoritos desde localStorage al inicio
        loadFavorites() {
            const storedFavorites = localStorage.getItem( 'favoritePokemons' );
            if( storedFavorites ) {
                this.favoritePokemons = JSON.parse( storedFavorites );
            }
        },
        setSearchText( value: string ) {
            // Solo actualizamos si el valor ha cambiado realmente
            if (this.searchText !== value) {
                this.searchText = value;
                console.log('Store searchText updated:', value);
            }
        }
    },
} );
