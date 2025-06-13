import { reactive, ref } from 'vue';
import { usePokemonStore } from '../store/pokemon';
import type { PokemonResponse } from '../models/pokemonResponse.interface';
import { getPokemonDetail, getPokemonList } from '../services/pokemonService.ts';

/**
 * @composable usePokemonData
 * @description Composable que encapsula toda la lógica de obtención y manipulación de datos de Pokémon
 * Sigue el principio de Responsabilidad Única (S en SOLID) al separar esta lógica de los componentes
 */
export function usePokemonData() {
    // Store para acceder al estado global
    const pokemonStore = usePokemonStore();

    // Estado local
    const pokemons = reactive<PokemonResponse[]>( [] );
    const selectedPokemon = reactive<any>( {} );
    const loading = ref( true );
    const error = ref<string | null>( null );

    /**
     * Carga la lista de Pokémon desde el servicio
     */
    const loadPokemonList = async () => {
        loading.value = true;
        error.value = null;
        try {
            const list = await getPokemonList();
            // Marcar favoritos según el estado del store
            const processedList = list.map( ( item: any ) => ( {
                ...item,
                favorite: pokemonStore.isFavorite( item.name )
            } ) );
            // Limpiar el array actual y añadir los nuevos elementos
            pokemons.splice( 0, pokemons.length );
            pokemons.push( ...processedList );

        } catch ( err ) {
            error.value = 'Error al cargar la lista de Pokémon';
            console.error( error.value, err );
        } finally {
            // Simula demora en el servicio ( muesta el loading)
            setTimeout( () => {
                loading.value = false;
            }, 500 );
        }
    };

    /**
     * Carga los detalles de un Pokémon específico
     * @param name Nombre del Pokémon
     */
    const loadPokemonDetail = async ( name: string ) => {
        try {
            const { height, name: pokemonName, sprites, types, weight } = await getPokemonDetail( name );

            // Actualizar el objeto reactivo con los datos formateados
            Object.assign( selectedPokemon, {
                name: pokemonName,
                height,
                weight,
                imageUrl: sprites.other?.[ 'official-artwork' ].front_default,
                types: types.map( ( t: any ) => t.type.name ),
                favorite: pokemonStore.isFavorite( name )
            } );

            return selectedPokemon;
        } catch ( err ) {
            error.value = `Error al cargar los detalles de ${ name }`;
            console.error( error.value, err );
            return null;
        }
    };

    /**
     * Alterna el estado de favorito de un Pokémon
     * @param name Nombre del Pokémon
     */
    const toggleFavorite = ( name: string ) => {
        pokemonStore.toggleFavorite( name );

        // Actualizar el estado local para reflejar el cambio
        pokemons.forEach( ( pokemon ) => {
            if( pokemon.name === name ) {
                pokemon.favorite = pokemonStore.isFavorite( name );
            }
        } );

        // Si hay un Pokémon seleccionado, actualizar también su estado
        if( selectedPokemon && selectedPokemon.name === name ) {
            selectedPokemon.favorite = pokemonStore.isFavorite( name );
        }
    };


    return {
        // Estado
        pokemons,
        selectedPokemon,
        loading,
        error,
        // Métodos
        loadPokemonList,
        loadPokemonDetail,
        toggleFavorite
    };
}
