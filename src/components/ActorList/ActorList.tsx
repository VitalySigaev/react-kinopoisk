import { ChangeEvent, FC, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { IPerson } from '../../types/type';

interface ActorListProps {
    actors: IPerson[];
}

const ActorList: FC<ActorListProps> = ({ actors }) => {
    const [page, setPage] = useState<number>(1);
    const itemsPerPage: number = 6;
    const totalPages: number = Math.ceil(actors.length / itemsPerPage);
    const startIndex: number = (page - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;
    const visibleActors: IPerson[] = actors.slice(startIndex, endIndex);

    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div>
            <List>
                {visibleActors.map((actor: IPerson) => (
                    <ListItem key={actor.id}>
                        <ListItemAvatar>
                            <Avatar alt={actor.name} src={actor.photo} />
                        </ListItemAvatar>
                        <ListItemText primary={actor.name ? actor.name : actor.enName} />
                    </ListItem>
                ))}
            </List>
            {totalPages > 1 && (
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                    style={{ marginTop: 10 }}
                />
            )}
        </div>
    );
};

export default ActorList;
