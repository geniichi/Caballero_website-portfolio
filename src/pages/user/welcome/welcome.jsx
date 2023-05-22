import './welcome.css';
import Header from '../../../shared/Header'
import Footer from '../../../shared/Footer'
import AboutMe from './AboutMe/AboutMe';
import KnowledgeAndSkills from './KnowledgeAndSkills/KnowledgeAndSkills';
import Introduction from './Introduction/Introduction';
import Aspire from './Aspire/Aspire';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Welcome = () => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [numberOfDataLoaded, setNumberOfDataLoaded] = useState(0)

    useEffect(() => {
        toast.loading("Loading...", { toastId: "loadingToast" });
        console.log("loading...")
    }, []);

    useEffect(() => {
      if (numberOfDataLoaded === 4) {
        setDataLoaded(true);
        toast.dismiss();
      } else {
        setDataLoaded(false);
      }
    }, [numberOfDataLoaded]);

    return (
      <>
        <Header dataLoaded={dataLoaded}/>
        <motion.main
            className="d-flex flex-column align-items-center"
            initial={{x: "-100%"}}
            animate={{x: "0%"}}
            transition={{type: 'spring', duration: 1, bounce: 0.3}}
            exit={{ x: window.innerWidth, transition: {duration: 0.7}}}
        >
            <Introduction dataLoaded={dataLoaded} setNumberOfDataLoaded={setNumberOfDataLoaded}/>
            <AboutMe dataLoaded={dataLoaded} setNumberOfDataLoaded={setNumberOfDataLoaded}/>
            <KnowledgeAndSkills dataLoaded={dataLoaded} setNumberOfDataLoaded={setNumberOfDataLoaded}/>
            <Aspire dataLoaded={dataLoaded} setNumberOfDataLoaded={setNumberOfDataLoaded}/>
        </motion.main>
        <Footer dataLoaded={dataLoaded}/>
      </>


    )
}

export default Welcome
