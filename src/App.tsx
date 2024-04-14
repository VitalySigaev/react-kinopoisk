import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MoviesPage from './pages/MoviesPage';
import MoviePage from './pages/MoviePage';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import SearchPage from './pages/SearchPage';
import { AuthContext } from './context';
import { useState } from 'react';
import LoginPage from './pages/LoginPage';


function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth
    }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/movies' element={<MoviesPage />} />
          <Route path='/movie/:id' element={<MoviePage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/*' element={<ErrorMessage message='Такой страницы не существует' />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
