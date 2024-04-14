import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import cls from './MoviesListItemCard.module.css'
import { ICountry, IGenre, IMovie } from "../../types/type"
import { FC } from "react"
import { useNavigate } from "react-router-dom";

interface MoviesListItemCardProps {
    movie: IMovie;
}

const MoviesListItemCard: FC<MoviesListItemCardProps> = ({ movie }) => {
    const router = useNavigate();
    return (
        <Card className={cls.cardContainer} onClick={() => router(`/movie/${movie.id}`)}>
            <CardMedia
                component='img'
                image={movie?.poster?.url}
                alt={movie.name}
                className={cls.cardImage}
            />
            <CardContent className={cls.cardContent}>
                <Typography variant="h4" component="div">
                    {movie.name ? movie.name : 'Название отсутствует'}
                </Typography>
                <Typography variant="h5" component="div">
                    {(movie.names[1]) ? `${movie.names[1]?.name}, ` : 'Альтернативные названия отсутствуют, '}
                    {movie.year ? `${movie.year}, ` : 'Год отсутствует, '}
                    {(movie.type === 'movie' || movie.type === 'cartoon')
                        ? `${movie.movieLength ? `${movie.movieLength} мин` : 'Информация отсутствует'}`
                        : `Количество серий: ${movie.seriesLength ? movie.seriesLength : 'Информация отсутствует'}`
                    }
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {
                        movie.countries.length > 1
                            ? `Страны: ${movie.countries.map((country: ICountry, index: number) =>
                                (index === movie.countries.length - 1)
                                    ? `${country.name}`
                                    : `${country.name},`
                            ).join(' ')}`
                            : movie.countries.length
                                ? `Cтрана: ${movie.countries.map((country: ICountry) => country.name)}`
                                : 'Страны отсутствуют'
                    }
                </Typography>
                <Typography gutterBottom variant="subtitle1" color="text.secondary">
                    {movie.genres ? `Жанры: ${movie.genres.map((genre: IGenre, index: number) =>
                        (index === movie.genres.length - 1)
                            ?
                            ` ${genre.name}`
                            :
                            ` ${genre.name}`
                    )}` : 'Жанры отсутствуют'}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default MoviesListItemCard