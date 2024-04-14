
import { ChangeEvent, FC, useEffect, useState } from "react";
import { IFilters, IMovie } from "../types/type";
import Loader from "../components/Loader/Loader";
import MoviesService from '../API/MoviesService'
import MySelect from "../components/MySelect/MySelect";
import MovieList from "../components/MoviesList/MoviesList";
import { useFetching } from "../hooks/useFetching";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Search from "../components/Search/Search";
import { Button, Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { getYears } from "../utils/years";

const MoviesPage: FC = () => {
    const years = getYears();
    const [countriesValues, setCountriesValues] = useState<string[]>([]);
    const limitValues = [5, 10, 15, 20];
    const ageRatingValues = [0, 6, 12, 16, 18];
    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(() => {
        const storedPage = localStorage.getItem('currentPage');
        return storedPage ? parseInt(storedPage, 10) : 1;
    });
    const [totalPages, setTotalPages] = useState<number>(1);
    const [filters, setFilters] = useState<IFilters>(() => {
        const storedFilters = localStorage.getItem('moviesPageFilters');
        return storedFilters ? JSON.parse(storedFilters) : {
            limit: 10,
            year: null,
            ageRating: null,
            country: null,
        };
    });


    const handleChangeFilters = async (name: string, value: string | number | null) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value === '' || value === null ? null : (name === 'limit' ? +value : value),

        }));
        setCurrentPage(1);
    };

    const handleResetFilters = () => {
        setFilters({
            limit: 10,
            year: null,
            ageRating: null,
            country: null,
        });
        setCurrentPage(1);
    };

    const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page)
    };

    const getCountries = async () => {
        try {
            const response = await MoviesService.getCountriesName();
            const countries = response.data.map((country: any) => country.name);
            setCountriesValues(countries);
        } catch (error) {
            console.error("Ошибка при получении списка стран:", error);
        }
    };


    const [fetchMovies, isMoviesLoading, moviesError] = useFetching(async () => {
        const response = await MoviesService.getAllMovies(filters, currentPage);
        setMovies(response.data.docs);
        setTotalPages(response.data.pages);
    });

    useEffect(() => {
        fetchMovies();
    }, [filters, currentPage]);

    useEffect(() => {
        getCountries();
    }, [])

    useEffect(() => {
        localStorage.setItem('currentPage', currentPage.toString());
    }, [currentPage]);

    useEffect(() => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null) {
                params.append(key, value.toString());
            }
        });
        params.append('page', currentPage.toString());
        setSearchParams(params);

        localStorage.setItem('moviesPageFilters', JSON.stringify(filters));
    }, [filters, currentPage, setSearchParams]);

    return (
        <>
            <Search />
            {moviesError ? <ErrorMessage message={moviesError} /> : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignSelf: 'center', flexWrap: 'wrap', marginLeft: 5 }}>
                        <MySelect options={limitValues} handleChange={(value) => handleChangeFilters('limit', value)} value={filters.limit} label="Количество фильмов на странице" />
                        <MySelect options={years} handleChange={(value) => handleChangeFilters('year', value)} value={filters.year || ''} label="Сортировка по году" />
                        <MySelect options={ageRatingValues} handleChange={(value) => handleChangeFilters('ageRating', value)} value={filters.ageRating || ''} label="Сортировка по возрастному рейтингу" />
                        <MySelect options={countriesValues} handleChange={(value) => handleChangeFilters('country', value)} value={filters.country || ''} label="Сортировка по стране" />
                        <Button onClick={handleResetFilters}>Сбросить фильтры</Button>
                    </div>
                    {isMoviesLoading ? (
                        <Loader elements={filters.limit} />
                    ) : movies.length > 0 ? (
                        <>
                            <MovieList movies={movies} />
                            <Pagination
                                count={totalPages}
                                variant="outlined"
                                shape="rounded"
                                color="primary"
                                page={currentPage}
                                onChange={handleChangePage}
                                style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}
                            />
                        </>
                    ) : (
                        'Фильмы не найдены'
                    )}
                </div>
            )}
        </>
    );

}

export default MoviesPage;
