import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import NavBar from './components/navbar.jsx';
import HomePage from './pages/home-page.jsx';
import AboutPage from './pages/about.jsx';
import ArticlesListPage from './pages/article-list.jsx';
import ArticlePage from './pages/article.jsx';
import NotFoundPage from './pages/not-found.jsx';
import LoginPage from './pages/login.jsx';
import SignUpPage from './pages/signup.jsx';
import Footer from './components/footer.jsx';
import { AuthProvider } from './contexts/authContext/index.jsx';
import useLocalStorage from './components/useLocalStorage.jsx';


function App() {

  const url = import.meta.env.VITE_REACT_APP_API_URL; //<--así se usan las env en react

  // Función para cambiar el tema:
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  function handleToggleTheme(){
    setTheme(t => t === 'light' ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>

      <div className='App' data-theme={theme}>

        <AuthProvider>
          {/* Cambiar tema claro/oscuro */}
          <div className='theme-btn-container'>
            <input type='checkbox' id='toggle-btn' onChange={handleToggleTheme}/>
            <label htmlFor="toggle-btn" className='toggle-bg'></label>
            <div className='icons'>
              <span className="material-symbols-outlined sun">light_mode</span>
              <span className="material-symbols-outlined moon">dark_mode</span>
            </div>
          </div>

          {/* Componente de barra de navegación: */}
          <NavBar />

          {/* Cuerpo de las páginas: */}
          <div id='page-body'>

            <Routes>

              <Route path='/' element={<HomePage url={url} theme={theme} />} />

              <Route path='/about' element={<AboutPage />} />

              <Route path='/articles' element={<ArticlesListPage />} />

              <Route path='/articles/:articleId' element={<ArticlePage url={url} theme={theme} />} />

              <Route path='/login' element={<LoginPage />} />

              <Route path='/signup' element={<SignUpPage url={url} />} />

              <Route path='*' element={<NotFoundPage />} />

            </Routes>

          </div>
        </AuthProvider>
        {/* Componente de barra de footer: */}
        <Footer />
      </div>

    </BrowserRouter>
  );
}

export default App
