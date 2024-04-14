
import Pagination from '@mui/material/Pagination';
import { List, ListItem, ListItemText } from "@mui/material";
import { FC } from 'react';
import { IRewiev } from '../../types/type';
import cls from './ReviewList.module.css'

interface ReviewListProps {
    reviews: IRewiev[];
    totalPages: number;
    page: number;
    handleChangePage: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const ReviewList: FC<ReviewListProps> = ({ reviews, totalPages, page, handleChangePage }) => {
    return (
        <div className={cls.reviewListContainer}>
            <List>
                {reviews.map((review: IRewiev) => (
                    <ListItem className={cls.reviewListItem} key={review.id} >
                        <div className={cls.reviewListItemText} >
                            <ListItemText primary='Имя' secondary={review.author} />
                            <ListItemText primary='Тип отзыва' secondary={review.type} className={cls.reviewListItemTextRight} />
                        </div>
                        <ListItemText primary='Текст отзыва' secondary={review.review} className={cls.reviewListItemTextCenter} />
                    </ListItem>
                ))}
            </List>
            <Pagination count={totalPages} variant="outlined" shape="rounded" color="primary" page={page} onChange={handleChangePage} className={cls.reviewListPagination} />
        </div>
    );

}

export default ReviewList