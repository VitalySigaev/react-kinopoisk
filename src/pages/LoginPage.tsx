import { useContext, useState } from 'react';
import { TextField, Button, Snackbar, Typography } from '@mui/material';
import { AuthContext } from '../context';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext)
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useNavigate();

    const styles = {
        container: {
            marginBottom: '10px',
            width: '300px'
        }
    }

    const handleLogin = () => {
        if (username === 'admin' && password === 'admin') {
            setIsAuth(true);
            router('/movies');
        } else {
            setError('Неверное имя пользователя или пароль');
        }
    };

    return (
        <div>
            <div style={{ textAlign: 'center', marginTop: 10 }}>
                <Link to='/movies?page=1'>Фильмы</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}>
                <Typography style={styles.container} variant="h4">Вход</Typography>
                <TextField
                    label="Имя пользователя"
                    placeholder='admin'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.container}
                />
                <TextField
                    label="Пароль"
                    placeholder='admin'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.container}
                />
                <Button variant="contained" onClick={handleLogin}>Войти</Button>
                <Snackbar open={error !== ''} message={error} />
            </div>
        </div>
    );
};

export default LoginPage;
