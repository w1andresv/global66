import axios from 'axios';
import type { Pokemon } from '../models/pokemon.interface';
import type { PokemonResponse } from '../models/pokemonResponse.interface';

const BASE_URL = import.meta.env.VITE_POKE_API;

const api = axios.create( {
    baseURL: BASE_URL,
    timeout: 10000,
} );

export const print = () => {
    console.log( 'api', BASE_URL );
};

export const getPokemonList = async (): Promise<PokemonResponse[]> => {
    try {
        const { data } = await api.get( '' );
        return data.results;
    } catch ( error ) {
        console.error( 'Error fetching Pokemon list:', error );
        throw error;
    }
};

export const getPokemonDetail = async ( nameOrId: string | number ): Promise<Pokemon> => {
    try {
        const { data } = await api.get( `/${ nameOrId }` );
        return data;
    } catch ( error ) {
        console.error( 'Error fetching Pokemon detail:', error );
        throw error;
    }
};
