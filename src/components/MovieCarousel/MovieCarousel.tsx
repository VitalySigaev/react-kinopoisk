
import Carousel from 'react-material-ui-carousel';
import { IMovie } from '../../types/type';
import { Card, CardMedia, Typography } from '@mui/material';
import cls from './MovieCarousel.module.css'
import { FC } from 'react';

interface MovieCarouselProps {
    movies: IMovie[];
    handleChangeMovie: (id: number) => void
}

const MovieCarousel: FC<MovieCarouselProps> = ({ movies, handleChangeMovie }) => {
    return (
        <div className={cls.carouselContainer} >
            <Carousel animation="fade"
                navButtonsAlwaysVisible
                autoPlay={false}
            >
                {movies.map((movie: IMovie) => (
                    <Card key={movie.id} onClick={() => handleChangeMovie(movie.id)}>
                        <CardMedia
                            component="img"
                            image={movie.poster.url}
                            alt={movie.name}
                            className={cls.carouselImage}
                        />
                        <Typography variant="h5">{movie.name}</Typography>
                    </Card>
                ))}
            </Carousel>
        </div >
    );
};

export default MovieCarousel;

