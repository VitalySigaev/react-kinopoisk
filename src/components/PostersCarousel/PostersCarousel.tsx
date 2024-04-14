import { Card, CardMedia } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import { IPosters } from '../../types/type'
import cls from './PostersCarousel.module.css'
import { FC } from 'react'


interface PostersCarouselProps {
    posters: IPosters[]
}


const PostersCarousel: FC<PostersCarouselProps> = ({ posters }) => {
    return (
        <div className={cls.postersContainer}>
            <Carousel animation="fade"
                autoPlay={false}
                navButtonsAlwaysVisible
            >
                {posters?.map((poster: IPosters) => (
                    <Card key={poster.id}>
                        <CardMedia
                            component="img"
                            image={poster.url}
                            alt={poster.id}
                            className={cls.posterImage}
                        />
                    </Card>
                ))}
            </Carousel>
        </div >
    )
}

export default PostersCarousel