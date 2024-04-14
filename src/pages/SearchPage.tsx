import { FC, useEffect, useState } from "react";
import Search from "../components/Search/Search"
import { useLocation, useNavigate } from "react-router-dom";
import MoviesService from '../API/MoviesService'
import { useFetching } from "../hooks/useFetching";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { Button, Typography } from "@mui/material";
import Loader from "../components/Loader/Loader";
import MovieList from "../components/MoviesList/MoviesList";
import { IMovie } from "../types/type";


const SearchPage: FC = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query") || '';
    const router = useNavigate();

    const [searchMovies, isMoviesLoading, searchError] = useFetching(async () => {
        const response = await MoviesService.searchMovies(query);
        setMovies(response.data.docs);
    })

    useEffect(() => {
        searchMovies();
    }, [query])

    return (
        <div>
            <Button onClick={() => router('/movies')}>К фильмам</Button>
            <Search />
            {searchError ? <ErrorMessage message={searchError} /> : (
                <>
                    {isMoviesLoading &&
                        <Typography variant="body1" color="textSecondary">
                            Идет поиск...
                        </Typography>}
                    {movies.length > 0 && (
                        <div>
                            <h2>Результаты поиска:</h2>
                            {isMoviesLoading ? <Loader elements={5} /> : <MovieList movies={movies} />}
                        </div>
                    )}
                </>)}
        </div>
    )
}

export default SearchPage