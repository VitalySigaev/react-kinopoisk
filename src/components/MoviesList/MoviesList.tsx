
import { FC } from 'react';
import { IMovie } from '../../types/type'
import MoviesListItemCard from '../MoviesListItemCard/MoviesListItemCard'

interface MovieListProps {
    movies: IMovie[];
}


const MovieList: FC<MovieListProps> = ({ movies }) => {
    return (
        <div style={{ margin: '20px 20px 0 20px' }}>
            {movies.map((movie: IMovie) =>
                <MoviesListItemCard key={movie.id} movie={movie} />
            )}
        </div>

    )
}

export default MovieList