export interface IMovie {
    id: number;
    name: string;
    poster: IPoster;
    countries: ICountry[]
    genres: IGenre[];
    year: number;
    movieLength: number;
    names: IName[];
    type: string;
    seriesLength?: number;
}

export interface ICountry {
    name: string;
}

export interface IGenre {
    name: string;
}

export interface IPoster {
    url: string;
}

export interface IPosters {
    id: string;
    url: string;
}

export interface IName {
    name: string;
}

export interface IMovieDetails extends IMovie {
    description: string;
    rating: IRating;
    persons: IPerson[];
    similarMovies: IMovie[];
}

export interface IPerson {
    id: number
    description: string;
    name: string;
    enName: string;
    photo: string;

}
export interface IRating {
    kp: number;
}

export interface IFilters {
    limit: number;
    year: number | null;
    ageRating: number | null;
    country: string | null;
}

export interface IRewiev {
    author: string;
    review: string;
    type: string;
    id: number;
}

export interface ISeason {
    id: string;
    name: string;
    episodes: IEpisode[];
    number: number;
}
export interface IEpisode {
    name: string;
    number: number;
}