import { Routes, Route, useLocation } from 'react-router-dom';
import Welcome from '../pages/user/welcome/welcome';
import { AnimatePresence } from 'framer-motion'
import ContactMe from '../pages/user/contactMe/ContactMe';
import Project from '../pages/user/MyProjects/MyProject';
import SignUpAsAdmin from '../pages/admin/SignUpAsAdmin';

const AnimatedRoutes = ({ setCurrentUser, loading, setLoading }) => {

    const location = useLocation();

  return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Welcome loading={loading} setLoading={setLoading}/>}/>
            <Route path="/projects" element={<Project/>}/>
            <Route path="/contact" element={<ContactMe/>}/>
            <Route path="/admin" element={<SignUpAsAdmin setCurrentUser={setCurrentUser}/>}/>
        </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
