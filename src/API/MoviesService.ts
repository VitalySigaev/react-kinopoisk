import axios from "axios";
import { IFilters } from "../types/type";



export default class MoviesService {
    static url = 'https://api.kinopoisk.dev/v1.4';
    static apiToken = '';

    static async getAllMovies(filters: IFilters, currentPage: number) {
        const { limit, year, ageRating, country } = filters;
        const response = await axios.get(this.url + '/movie', {
            headers: {
                'X-API-KEY': this.apiToken
            },
            params: {
                limit,
                page: currentPage,
                year,
                ageRating,
                'countries.name': country
            }
        });

        return response;
    }

    static async getMovieDetails(id: number, endpoint: string, currentPage?: number, limit?: number) {
        const response = await axios.get(this.url + endpoint, {
            headers: {
                'X-API-KEY': this.apiToken,
            },
            params: {
                movieId: id,
                page: currentPage,
                limit,
            }
        });
        return response
    }

    static async searchMovies(query: string) {
        const response = await axios.get(this.url + '/movie/search', {
            headers: {
                'X-API-KEY': this.apiToken,
            },
            params: {
                query: query
            }
        });
        return response;
    }

    static async getCountriesName() {
        const response = await axios.get('https://api.kinopoisk.dev/v1/movie/possible-values-by-field', {
            headers: {
                'X-API-KEY': this.apiToken,
            },
            params: {
                field: 'countries.name'
            }
        });
        return response;
    }
}
