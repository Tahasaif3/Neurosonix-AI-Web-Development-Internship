import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MovieGrid } from './components/MovieGrid';
import { Footer } from './components/Footer';
import { Login } from './components/Auth/Login';
import { Signup } from './components/Auth/Signup';
import { movieService } from './services/movie_app';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      '.stat-item',
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.stat-item',
          start: 'top 90%',
        },
      }
    );
  }, []);

  const handleSwitchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header onShowLogin={() => setShowLogin(true)} onShowSignup={() => setShowSignup(true)} />
      <Hero />
      <MovieGrid
        title="Trending Now"
        fetchFunction={() => movieService.getTrending('day')}
        sectionId="trending"
      />
      <MovieGrid
        title="Popular Movies"
        fetchFunction={() => movieService.getPopular()}
        sectionId="movies"
      />
      <MovieGrid
        title="Top Rated"
        fetchFunction={() => movieService.getTopRated()}
        sectionId="top-rated"
      />
      <Footer />

      {showLogin && (
        <Login onClose={() => setShowLogin(false)} onSwitchToSignup={handleSwitchToSignup} />
      )}
      {showSignup && (
        <Signup onClose={() => setShowSignup(false)} onSwitchToLogin={handleSwitchToLogin} />
      )}
    </div>
  );
}

export default App;
