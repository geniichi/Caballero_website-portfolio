import './App.css';
import Footer from './shared/Footer'
import AnimatedRoutes from './components/AnimatedRoutes';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300) {
        setVisible(true);
      } else if (scrolled <= 300) {
        setVisible(false);
      }
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    window.addEventListener('scroll', toggleVisible);

  return (
    <div>
      <ToastContainer position="top-center" />
      <AnimatedRoutes/>
      <button
        className='border-light'
        id="welcome-directTop-button"
        onClick={scrollToTop}
        style={{ display: visible ? 'inline' : 'none' }}
      >
        <i className='fa fa-arrow-up text-light'></i>
      </button>
    </div>
  );
}

export default App;
