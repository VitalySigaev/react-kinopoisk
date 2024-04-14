import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import Loader from "../Loader/Loader"
import ActorList from "../ActorList/ActorList"
import ReviewList from "../ReviewList/ReviewList"
import PostersCarousel from "../PostersCarousel/PostersCarousel"
import MovieCarousel from "../MovieCarousel/MovieCarousel"
import SeasonList from "../SeasonList/SeasonList"
import { IMovieDetails, ISeason, IPosters, IRewiev } from "../../types/type"
import { FC } from "react"
import cls from './MovieCard.module.css'
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import MoviesService from "../../API/MoviesService"
import { useFetching } from "../../hooks/useFetching"


const MovieCard: FC = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<IMovieDetails | null>(null);
    const [reviews, setReviews] = useState<IRewiev[]>([]);
    const [reviewsPage, setReviewsPage] = useState<number>(1);
    const [totalReviewsPages, setTotalReviewsPages] = useState<number>(0);
    const [posters, setPosters] = useState<IPosters[]>([]);
    const [seasons, setSeasons] = useState<ISeason[]>([]);
    const router = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;


    const [fetchMovieById, movieIsLoading, movieError] = useFetching(async (id) => {
        const movieInfo = await MoviesService.getMovieDetails(id, `/movie/${id}`)
        setMovie(movieInfo.data);
    })

    const [fetchReviewsByMovieId, reviewsIsLoading, reviewsError] = useFetching(async (id) => {
        const reviews = await MoviesService.getMovieDetails(id, '/review', reviewsPage, 1);
        setReviews(reviews.data.docs);
        setTotalReviewsPages(reviews.data.pages);
    })

    const [fetchPostersByMovieId, postersIsLoading, postersError] = useFetching(async (id) => {
        const posters = await MoviesService.getMovieDetails(id, '/image');
        setPosters(posters.data.docs)


    })
    const [fetchSeasonsByMovieId, seasonsIsLoading, seasonsError] = useFetching(async (id) => {
        const seasons = await MoviesService.getMovieDetails(id, '/season');
        setSeasons(seasons.data.docs)
    })

    const handleChangeMovie = (id: number) => {
        router(`/movie/${id}`)
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setReviewsPage(page);
    };

    useEffect(() => {
        fetchMovieById(id);
        fetchPostersByMovieId(id);
    }, [currentPath])

    useEffect(() => {
        fetchReviewsByMovieId(id);
    }, [reviewsPage])

    useEffect(() => {
        fetchSeasonsByMovieId(id);
    }, [])

    const handleGoBack = () => {
        router(-1);
    };


    return (
        <>
            {movieError ? <ErrorMessage message={movieError} /> :
                movieIsLoading ? <Loader elements={1} /> :
                    <Card className={cls.cardContainer}>
                        <CardMedia
                            component='img'
                            image={movie?.poster?.url}
                            alt={movie?.name}
                            className={cls.cardImage}
                        />
                        <CardContent>
                            <div className={cls.cardContent}>
                                <Button onClick={handleGoBack}>Назад</Button>
                                <Typography variant="h5" >
                                    {movie?.name ? movie?.name : 'Название отсутствует'}
                                    <Typography  >
                                        {(movie?.names[1]) ? `${movie?.names[1]?.name}, ` : 'Альтернативные названия отсутствуют, '}
                                        {movie?.year ? `${movie?.year}, ` : 'Год отсутствует, '}
                                        {(movie?.type === 'movie' || movie?.type === 'cartoon')
                                            ? `${movie?.movieLength} мин`
                                            : `Количество серий: ${movie?.seriesLength}`
                                        }
                                    </Typography>
                                </Typography>
                                <Typography variant="h5" >
                                    Рейтинг на кинопоиске: {movie?.rating.kp ? movie?.rating.kp : 'Информация отсутствует'}
                                </Typography>
                                <Typography variant="h6" >
                                    {movie?.description ? movie?.description : 'Описание отсутсвует'}
                                </Typography>

                            </div>
                            <div className={cls.cardPersonsAndReviews}>
                                {movie?.persons ? <ActorList actors={movie?.persons || []} /> : 'Список актеров отсутствует'}
                                {reviewsError ? <ErrorMessage message={reviewsError} />
                                    : reviewsIsLoading
                                        ? <Loader elements={1} />
                                        : reviews.length
                                            ? <ReviewList reviews={reviews} totalPages={totalReviewsPages} page={reviewsPage} handleChangePage={handleChangePage} />
                                            : 'Отзывы отсутствуют'
                                }
                            </div>
                            <div className={cls.cardPostersAndSimilarMovies}>
                                {postersError ? <ErrorMessage message={postersError} />
                                    : postersIsLoading
                                        ? <Loader elements={1} />
                                        : posters.length
                                            ? <PostersCarousel posters={posters} />
                                            : <Typography>Постеры отсутствуют</Typography>
                                }
                                {movie?.similarMovies.length ?
                                    <MovieCarousel movies={movie.similarMovies} handleChangeMovie={handleChangeMovie} />
                                    : <Typography>Похожие фильмы отсутствуют</Typography>}

                            </div>
                            {seasonsError ?
                                <ErrorMessage message={seasonsError} />
                                : seasonsIsLoading
                                    ? <Loader elements={1} />
                                    : seasons.length
                                        ? <SeasonList seasons={seasons} />
                                        : <></>}
                        </CardContent>
                    </Card >

            }
        </>
    )
}

export default MovieCard