import { pokeApi } from '../../config/api/pokeApi';
import { Pokemon } from '../../domain/entities/pokemon';
import {
    PokeAPIPaginatedResponse,
    PokeApiPokemon,
} from '../../infrastructure/interfaces/pokeApi.interface';
import { PokemonMapper } from '../../infrastructure/mappers/pokemon.mapper';

export const sleep = async () => {
    return new Promise(resolve => setTimeout(resolve, 2000));
};

export const getPokemons = async (page: number, limit: number = 20,): Promise<Pokemon[]> => {
    // await sleep();
    try {
        const url = `/pokemon?offset=${page * 10}&limit=${limit}`;
        const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);
        const pokemonPromises = data.results.map(info => {
            return pokeApi.get<PokeApiPokemon>(info.url);
        });

        const pokeApiPokemons = await Promise.all(pokemonPromises);
        const pokemonsPromises = pokeApiPokemons.map(item => PokemonMapper.pokeApiPokemonToEntity(item.data));
        const pokemons = await Promise.all(pokemonsPromises);
    
        return pokemons;
    } catch (error) {
        console.log(error);
        throw new Error('Error getting pokemons');
    }
};
