
import Alert from '@mui/material/Alert';
import { FC } from 'react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
    return (
        <Alert severity="error">{message}</Alert>
    );
};

export default ErrorMessage;
