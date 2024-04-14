import { Skeleton } from "@mui/material"
import { FC } from "react";

interface LoaderProps {
    elements: number;
}

const Loader: FC<LoaderProps> = ({ elements }) => {
    return (
        <>
            {Array.from({ length: elements }, (_, index) => (
                <Skeleton key={index} variant="rounded" width={210} height={150} style={{ marginBottom: '10px' }} />
            ))}
        </>
    )
}

export default Loader