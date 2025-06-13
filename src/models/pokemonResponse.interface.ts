export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResponse[];
}

export interface PokemonResponse {
  name: string;
  url: string;
  favorite:boolean;
}
