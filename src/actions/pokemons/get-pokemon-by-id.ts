import { pokeApi } from "../../config/api/pokeApi";
import { Pokemon } from "../../domain/entities/pokemon";
import { PokeApiPokemon } from "../../infrastructure/interfaces/pokeApi.interface";
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper";

export const getPokemonById = async (id: number):Promise<Pokemon> => {
    try {
        console.log(`haciendo peticion a /pokemon/${id}`);
        const {data} = await pokeApi.get<PokeApiPokemon>(`/pokemon/${id}`);
        const pokemonPromise =  PokemonMapper.pokeApiPokemonToEntity(data);
        const pokemon = await pokemonPromise;
        return pokemon;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching pokemon by id');
    }
}