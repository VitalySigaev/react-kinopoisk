import { FC, useState } from 'react';
import { Pagination } from '@mui/material';
import { ISeason } from '../../types/type';


interface SeasonListProps {
    seasons: ISeason[];
}


const SeasonList: FC<SeasonListProps> = ({ seasons }) => {
    const itemsPerPage: number = 1;
    const [currentPage, setCurrentPage] = useState<number>(1);

    const reversedSeasons: ISeason[] = [...seasons].reverse();
    const totalPages: number = Math.ceil(reversedSeasons.length / itemsPerPage);
    const startIndex: number = (currentPage - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;
    const currentSeasons: ISeason[] = reversedSeasons.slice(startIndex, endIndex);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            {currentSeasons.map((season: ISeason) => (
                <div key={season.id}>
                    <h2>{season.name}</h2>
                    <ul>
                        {season.episodes.map(episode => (
                            <li key={episode.number}>{episode.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
        </div>
    );

};

export default SeasonList;