import './App.css';
import Header from './shared/Header';
import Footer from './shared/Footer'
import AnimatedRoutes from './components/AnimatedRoutes';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [currentUser, setCurrentUser] = useState();

  return (
    <div>
      <ToastContainer position="top-center" />
      <Header currentUser={currentUser}/>
      <AnimatedRoutes setCurrentUser={setCurrentUser}/>
      <Footer/>
    </div>
  );
}

export default App;
