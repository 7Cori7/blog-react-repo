import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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


function App() {

  const url = import.meta.env.VITE_REACT_APP_API_URL; //<--así se usan las env en react

  return (
    <BrowserRouter>

      <div className='App'>

        <AuthProvider>
          {/* Componente de barra de navegación: */}
          <NavBar />

          {/* Cuerpo de las páginas: */}
          <div id='page-body'>

            <Routes>

              <Route path='/' element={<HomePage />} />

              <Route path='/about' element={<AboutPage />} />

              <Route path='/articles' element={<ArticlesListPage />} />

              <Route path='/articles/:articleId' element={<ArticlePage url={url} />} />

              <Route path='/login' element={<LoginPage />} />

              <Route path='/signup' element={<SignUpPage />} />

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
