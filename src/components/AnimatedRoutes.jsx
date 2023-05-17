import { Routes, Route, useLocation } from 'react-router-dom';
import Welcome from '../pages/user/welcome/welcome';
// import Sample from './components/sample';
import { AnimatePresence } from 'framer-motion'
import ContactMe from '../pages/user/contactMe/ContactMe';
import Project from '../pages/user/MyProjects/MyProject';
import SignUpAsAdmin from './SignUpAsAdmin';

const AnimatedRoutes = ({ setCurrentUser }) => {

    const location = useLocation();

  return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Welcome/>}/>
            <Route path="/projects" element={<Project/>}/>
            <Route path="/contact" element={<ContactMe/>}/>
            <Route path="/signupAsAdmin" element={<SignUpAsAdmin setCurrentUser={setCurrentUser}/>}/>
        </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
